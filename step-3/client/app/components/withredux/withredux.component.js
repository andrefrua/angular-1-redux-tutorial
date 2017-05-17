import template from './withredux.html';
import controller from './withredux.controller';
import './withredux.scss';

let withReduxComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  transclude: true
};

export default withReduxComponent;