import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import {NavigationComponent} from './navigation.component';

export const NavigationModule = angular
  .module('navigation', [uiRouter])
  .component('navigation', NavigationComponent)
  .name;
