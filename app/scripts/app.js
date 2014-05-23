'use strict';

angular.module('appApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angular-chessboard'

])
  .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/views/partials/main.html',
            controller: 'MainCtrl'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('test', {
            url: '/test',
            templateUrl: '/views/partials/testDragDrop.html'
        });
        
});