import template from './navigation.html';

import TypeActions from '../../actions/type.actions';
import TypesSelectors from '../../selectors/types.selectors';

export const NavigationComponent = {
  template,
  controller: class NavigationComponent {
    /**
     * Constructor for the NavigationComponent
     * @param {*} $ngRedux
     */
    constructor($ngRedux) {
      'ngInject';
      let $ctrl = this;

      $ctrl.$onDestroy = onDestroy;
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
          // TODO: Remove the below line and all it's references. It's just to show the current full state
          completeState: state,

          // // Directly from the state
          // isLoading: state.TodosState.isLoading,
          // showType: state.TodosState.showType,
          // showDone: state.TodosState.showDone,
          // notification: state.TodosState.notification,
          // // Gets from the todo selector
          // noErrorTodos: TodosSelectors.getNoErrorsTodos(state),
          // doneTodos: TodosSelectors.getDoneTodos(state),
          // errorTodos: TodosSelectors.getErrorTodos(state),
          // countAllTodos: TodosSelectors.countAllTodos(state),
          // countDoneTodos: TodosSelectors.countDoneTodos(state),
          // countErrorTodos: TodosSelectors.countErrorTodos(state),
          // Get from the types selector
          allTypes: TypesSelectors.getAllTypes(state),
          countAllTypes: TypesSelectors.countAllTypes(state),

          // Parametric Selectors
          //getTodosByTypeGenerator: TodosSelectors.getTodosByTypeGenerator(2),
        };
      }

    }
  },
};
