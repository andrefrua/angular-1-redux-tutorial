import template from './navigation.html';
import './navigation.scss';

import TypeActions from '../../actions/type.actions';

import TodosSelectors from '../../selectors/todos.selectors';
import TypesSelectors from '../../selectors/types.selectors';

export const NavigationComponent = {
  template,
  controller: class NavigationComponent {
    /**
     * Constructor for the NavigationComponent
     * @param {*} $ngRedux
     * @param {*} $stateParams
     */
    constructor($ngRedux, $stateParams) {
      'ngInject';
      let $ctrl = this;

      $ctrl.$onDestroy = onDestroy;
      $ctrl.submitType = submitType;
      $ctrl.removeTypeAndPreventDefault = removeTypeAndPreventDefault;

      $ctrl.selectedTypeId = $stateParams.typeid;

      $ctrl.unsubscribe = $ngRedux.connect(mapStateToThis, {...TypeActions})($ctrl);

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
        return {
          allTypes: TypesSelectors.getAllTypes(state),

          // // Parametric Selectors to list and delete
          // noErrorTodosByTypeCache: TodosSelectors.getNoErrorTodosByTypeGenerator.$cache,
          // doneTodosByTypeCache: TodosSelectors.getDoneTodosByTypeGenerator.$cache,
          // errorTodosByTypeCache: TodosSelectors.getErrorTodosByTypeGenerator.$cache,
        };
      }

      /**
       * Calls the action addType send the input parameter and clearing the input type
       */
      function submitType() {
        // Exits if it's neither a mouse click, a enter key press or the inputTodo is empty
        if ((event.type !== 'click' && event.keyCode !== 13) || !$ctrl.inputType) return;

        $ctrl.addType($ctrl.inputType);
        $ctrl.inputType = '';
      }

      /**
       * Removes the type with the received Id and prevents the default behavior of the link so that the type filter
       * doesn't change. Also deletes the cache values on the selectors related to the deleted type
       * @param {*} typeId
       */
      function removeTypeAndPreventDefault(typeId) {

        // $ctrl.noErrorTodosByTypeCache.clear(); // Clear works without issues

        $ctrl.removeType(typeId);
        // TODO: I believe it's removing the cache by index instead of id
        // alert(JSON.stringify($ctrl.noErrorTodosByTypeCache.list()));
        $ctrl.noErrorTodosByTypeCache.delete(typeId);
        // alert(JSON.stringify($ctrl.noErrorTodosByTypeCache.list()));
        $ctrl.doneTodosByTypeCache.delete(typeId);
        $ctrl.errorTodosByTypeCache.delete(typeId);

        event.preventDefault();
      }
    }
  },
};
