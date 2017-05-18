// Third party dependencies
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

// Components
import { AppComponent } from './app.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { HomeModule } from './components/home/home.module';
import { NoReduxModule } from './components/noredux/noredux.module';
import { WithReduxModule } from './components/withredux/withredux.module';

// Reducers
import { RootReducer } from './reducers';

// Imports the default styles for all the application
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

export const AppModule = angular
  .module('app', [
    uiRouter,
    ngRedux,

    NavigationModule,
    HomeModule,
    NoReduxModule,
    WithReduxModule
  ])
  .config(($locationProvider, $stateProvider, $urlRouterProvider, $ngReduxProvider) => {
    "ngInject";

    // Define our app routing, we will keep our layout inside the app component
    // The layout route will be abstract and it will hold all of our app views
    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        template: '<app></app>'
      })
      // Home
      .state('app.home', {
        url: '/home',
        template: '<home></home>'
      })
      // NoRedux
      .state('app.noredux', {
        url: '/noredux',
        template: '<noredux></noredux>'
      })
      // Todo page with Redux
      .state('app.withredux', {
        url: '/withredux',
        template: '<with-redux></with-redux>'
      });
    $urlRouterProvider.otherwise('/withredux');

    $ngReduxProvider.createStoreWith(RootReducer, [thunk], [window.__REDUX_DEVTOOLS_EXTENSION__()]);
    })
  .component('app', AppComponent)
  .name;
