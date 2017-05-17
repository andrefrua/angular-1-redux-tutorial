import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import withReduxComponent from './withredux.component';

const withReduxModule = angular.module('withredux', [
  uiRouter
])

.component('withRedux', withReduxComponent);

export default withReduxModule;
