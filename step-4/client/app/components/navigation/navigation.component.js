import template from './navigation.html';
import './navigation.scss';

import TypeActions from '../../actions/type.actions';
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

      $ctrl.unsubscribe = $ngRedux.connect(mapStateToThis, {...TypeActions})($ctrl);

      $ctrl.selectedType = $stateParams.type;

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
        // $ctrl.selectedType = -1;
      }

      /**
       * Removes the type with the received Id and prevents the default behavior of the link so that the type filter
       * doesn't change
       * @param {*} typeId
       */
      function removeTypeAndPreventDefault(typeId) {
        $ctrl.removeType(typeId);
        event.preventDefault();
      }

    }
  },
};
