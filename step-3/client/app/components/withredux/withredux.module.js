import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { WithReduxComponent } from './withredux.component';
import { TodoListModule } from '../todoList/todoList.module';

//debugger; 
export const WithReduxModule = angular
  .module('withRedux', [uiRouter,TodoListModule])
  .component('withRedux', WithReduxComponent)
  .name;
