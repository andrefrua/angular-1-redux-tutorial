// Third party dependencies
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

// Components
import AppComponent from './app.component';
import NavigationComponent from './components/navigation/navigation';
import HomeComponent from './components/home/home'

// Imports the default styles for all the application
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

angular
    .module('app', [
        uiRouter,

        NavigationComponent.name,
        HomeComponent.name
    ])
    .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
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
        $urlRouterProvider.otherwise('/home');
    })
    .component('app', AppComponent);
