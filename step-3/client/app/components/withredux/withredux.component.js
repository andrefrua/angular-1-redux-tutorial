import template from './withredux.html';
import './withredux.scss';

import TodoActions from '../../actions/todo.actions';
import TypeActions from '../../actions/type.actions';

import TodosSelectors from '../../selectors/todos.selectors';
import TypesSelectors from '../../selectors/types.selectors';

export const WithReduxComponent = {
  template,
  transclude: true,
  controller: class WithReduxController {
    /**
     * Constructor for the WithReduxComponent
     * @param {*} $ngRedux
     */
    constructor($ngRedux) {
      'ngInject';
      let $ctrl = this;

      $ctrl.$onDestroy = onDestroy;
      $ctrl.unsubscribe = $ngRedux.connect(mapStateToThis, {...TodoActions, ...TypeActions})($ctrl);

      $ctrl.submitTodo = submitTodo;
      $ctrl.submitTodoInXSeconds = submitTodoInXSeconds;
      $ctrl.submitType = submitType;

      $ctrl.buttonClick = buttonClick;

      $ctrl.inputTodo = '';
      $ctrl.selectedType = -1;

      /**
       * onDestroy method
       */
      function onDestroy() {
        $ctrl.unsubscribe();
      }

      /**
       * mapStateToThis - Maps the state to the controller
       * @param {*} state
       * @return {*} Selectors from the state and other needed variables
       */
      function mapStateToThis(state) {
        console.log(TypesSelectors.getAllTypes(state));
        return {
          // TODO: Remove the below line and all it's references. It's just to show the current full state
          completeState: state,

          // Directly from the state
          isLoading: state.TodosState.isLoading,
          showType: state.TodosState.showType,
          showDone: state.TodosState.showDone,
          notification: state.TodosState.notification,
          // Gets from the todo selector
          noErrorTodos: TodosSelectors.getNoErrorsTodos(state),
          doneTodos: TodosSelectors.getDoneTodos(state),
          errorTodos: TodosSelectors.getErrorTodos(state),
          countAllTodos: TodosSelectors.countAllTodos(state),
          countDoneTodos: TodosSelectors.countDoneTodos(state),
          countErrorTodos: TodosSelectors.countErrorTodos(state),
          // Get from the types selector
          allTypes: TypesSelectors.getAllTypes(state),
        };
      }

      /**
       * Calls the action addTodo send the input parameter and clearing the input todo
       */
      function submitTodo() {
        // Exits if it's neither a mouse click, a enter key press or the inputTodo is empty
        if ((event.type !== 'click' && event.keyCode !== 13) || !$ctrl.inputTodo) return;

        $ctrl.addTodo($ctrl.inputTodo, $ctrl.selectedType.id);
        $ctrl.inputTodo = '';
        $ctrl.selectedType = -1;
      }

      /**
       * Calls the addTodo action but with a delay of x seconds
       * @param {*} seconds
       */
      function submitTodoInXSeconds(seconds) {
        $ctrl.addTodoThunk(seconds, $ctrl.inputTodo, $ctrl.selectedType.id);
        $ctrl.inputTodo = '';
        $ctrl.selectedType = -1;
      }

      /**
       * Calls the action addType send the input parameter and clearing the input type
       */
      function submitType() {
        // Exits if it's neither a mouse click, a enter key press or the inputTodo is empty
        if ((event.type !== 'click' && event.keyCode !== 13) || !$ctrl.inputType) return;

        $ctrl.addType($ctrl.inputType);
        $ctrl.inputType = '';
        $ctrl.selectedType = -1;
      }

      /**
       * Triggered when the action button is cliced on the component todoList
       * @param {*} id
       * @param {*} actionType
       * @param {*} event
       */
      function buttonClick(id, actionType, event) {
        switch (actionType) {
          case 'CleanError':
            $ctrl.cleanError(id);
            break;
          case 'ToggleDone':
            $ctrl.toggleDone(id);
            break;
          default:
            console.log('Invalid action type');
            break;
        }
      }
    }
  },
};
