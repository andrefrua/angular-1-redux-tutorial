import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { NoReduxComponent } from './noredux.component';

export const NoReduxModule = angular
  .module('noredux', [uiRouter])
  .component('noredux', NoReduxComponent)
  .name;
