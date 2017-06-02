import template from './todoList.html';
import './todoList.scss';

export const TodoListComponent = {
  restrict: 'E',
  bindings: {
    itemsCount: '<',
    itemsList: '<',
    actionType: '<',
    titleLabel: '<',
    noRecordsLabel: '<',
    buttonCssClass: '<',
    buttonSpanCssClass: '<',
    ulCssClass: '<',
    onItemButtonClick: '&',
  },
  // transclude: true,
  transclude: {
    addFields: '?addFieldsZone',
  },
  template,
  controller: class TodoListController {
    /**
     * Constructor for the TodoListController
     */
    constructor() {
      let $ctrl = this;

      $ctrl.$onInit = onInit;
      $ctrl.$onChanges = onChanges;
      $ctrl.itemButtonClick = itemButtonClick;

      /**
       * onInit method
       */
      function onInit() {
        console.log('Initialized');
      }

      /**
       * onChanges method
       */
      function onChanges() {
        console.log('Changed');
      }

      /**
       * itemButtonClick event
       * @param {*} id - Id of the item that was clicked
       * @param {*} actionType - The type of the action that is being applied to the item
       * @param {*} event
       */
      function itemButtonClick(id, actionType, event) {
        $ctrl.onItemButtonClick({id: id, actionType: actionType, $event: event});
      }
    }
  },
};
