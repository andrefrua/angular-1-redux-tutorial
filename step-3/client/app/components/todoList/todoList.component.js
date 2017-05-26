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
    onItemButtonClick: '&'
  },
  transclude: true,
  template,
  controller: class TodoListController {
    constructor() {
      var $ctrl = this;

      $ctrl.$onInit = onInit;
      $ctrl.$onChanges = onChanges;
      $ctrl.itemButtonClick = itemButtonClick;

      function onInit() {
        console.log('Initialized');
        //setLayout();        
      }

      function onChanges() {
        console.log('Changed');
      }

      function itemButtonClick(id, actionType, event) {
        $ctrl.onItemButtonClick({ id: id, actionType: actionType, $event: event });
      }

      /**
       * Defines UI settings to the buttons
       */
      function setLayout() {
        switch ($ctrl.actionType) {
          case 'ToggleDone':
            $ctrl.buttonClass = 'remove-item btn-danger btn-xs pull-right';
            $ctrl.buttonSpanClass = 'glyphicon glyphicon-remove'
            break;

          case 'CleanError':
            $ctrl.buttonClass = 'remove-item btn-primary btn-xs pull-right';
            $ctrl.buttonSpanClass = 'glyphicon glyphicon-refresh'
            break;
        }
      }
    }
  }
}
