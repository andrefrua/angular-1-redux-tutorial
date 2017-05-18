import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { WithReduxComponent } from './withredux.component';

export const WithReduxModule = angular
  .module('withredux', [uiRouter])
  .component('withRedux', WithReduxComponent)
  .name;
