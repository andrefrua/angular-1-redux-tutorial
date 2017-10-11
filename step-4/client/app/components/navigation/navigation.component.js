import template from './navigation.html';
import './navigation.scss';

import TypeActions from '../../actions/type.actions';

import TodoSelectors from '../../selectors/todos.selectors';
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

      $ctrl.unsubscribe = $ngRedux.connect(
        mapStateToThis($stateParams.typeid), {...TypeActions}
      )($ctrl);
      /**
       * onDestroy method
       */
      function onDestroy() {
        $ctrl.unsubscribe();
      }

      /**
       * mapStateToThis - Maps the state to the controller
       * @param {*} typeId
       * @return {*} Selectors from the state and other needed variables
       */
      function mapStateToThis(typeId) {
        return function(state) {
          return _.merge({

            // Get from the types selector
            allTypes: TypesSelectors.getAllTypes(state),
          },
            /**
             * Standard selectors
             */
            _.map(TodoSelectors.nonParametric, function(fn, key) {
              return {[key]: fn(state)};
            })[0], // TODO: Don't like having to use 0 index on the map. There must be a better way
            /**
             * Parametric selectors
             */
            _.map(TodoSelectors.parametric.type, function(fn, key) {
              return {[key]: fn(typeId)(state)};
            })[0] // TODO: Don't like having to use 0 index on the map. There must be a better way

          );
        };
      };
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
        $ctrl.removeType(typeId);

        console.log(TodoSelectors.parametric.type.$cache.list);
        TodoSelectors.parametric.type.$cache.delete(typeId);
        console.log(TodoSelectors.parametric.type.$cache.list);

        event.preventDefault();
      }
    }
  },
};
