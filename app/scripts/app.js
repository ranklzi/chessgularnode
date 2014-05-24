'use strict';

angular.module('appApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angular-chessboard'

])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    //$urlRouterProvider.otherwise('/home');
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('games', {
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('games.list', {
            url: '/games/list',
            templateUrl: 'views/partials/gamesListView.html',
            // template: "<div ui-view>asasasasa</div>",
            controller: 'GamesListCtrl'
        });

    $locationProvider.html5Mode(false);
})
  .run(['$rootScope','$state', '$stateParams',function ($rootScope, $state, $stateParams) {
    //parse url parameters for ui-router
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);