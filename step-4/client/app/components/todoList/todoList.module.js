import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import {TodoListComponent} from './todoList.component';

// debugger;

export const TodoListModule = angular
  .module('todoList', [uiRouter])
  .component('todoList', TodoListComponent)
  .name;
