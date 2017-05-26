import template from './withredux.html';
import './withredux.scss';

import TodoActions from '../../actions/todo.actions';
import { TODOS_TO_SHOW } from '../../constants/todos';
import TodoSelectors from './withredux.selectors'

export const WithReduxComponent = {
  template,
  transclude: true,
  controller: class WithReduxController {
    constructor($ngRedux) {
      'ngInject';
      var $ctrl = this;

      $ctrl.$onDestroy = onDestroy;
      $ctrl.unsubscribe = $ngRedux.connect(mapStateToThis, TodoActions)($ctrl);

      $ctrl.submitTodo = submitTodo;
      $ctrl.submitTodoInXSeconds = submitTodoInXSeconds;
      $ctrl.buttonClick = buttonClick;

      $ctrl.inputTodo = '';

      function onDestroy() {
        $ctrl.unsubscribe();
      }

      function mapStateToThis(state) {
        return {
          // TODO: Remove the below line and all it's references. It's just to show the current full state
          completeState: state,

          //Directly from the state
          isLoading: state.TodosState.isLoading,
          showDone: state.TodosState.showDone,
          notification: state.TodosState.notification,
          //Gets from the selector
          noErrorTodos: TodoSelectors.getNoErrorsTodos(state),
          doneTodos: TodoSelectors.getDoneTodos(state),
          errorTodos: TodoSelectors.getErrorTodos(state),
          countAllTodos: TodoSelectors.countAllTodos(state),
          countDoneTodos: TodoSelectors.countDoneTodos(state),
          countErrorTodos: TodoSelectors.countErrorTodos(state)
        }
      }

      /**
       * Calls the action addTodo send the input parameter and clearing the input todo
       */
      function submitTodo() {
        // Exits if it's neither a mouse click, a enter key press or the inputTodo is empty
        if ((event.type !== 'click' && event.keyCode !== 13) || !$ctrl.inputTodo) return;

        $ctrl.addTodo($ctrl.inputTodo);
        $ctrl.inputTodo = '';
      }

      function submitTodoInXSeconds(seconds) {
        $ctrl.addTodoThunk(seconds, $ctrl.inputTodo);
        $ctrl.inputTodo = '';
      }

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
  }
};
