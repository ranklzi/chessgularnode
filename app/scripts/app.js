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
        .state('home', {
            url: '/',
            template: "<div ui-view>asasasasa</div>" })
        .state('games', {
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('games.list', {
            url: '/games/list',
            templateUrl: 'views/partials/gamesListView.html',
            // template: "<div ui-view>asasasasa</div>",
            controller: 'GamesListCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/partials/loginView.html',
            controller: 'LoginCtrl'
        });

    $locationProvider.html5Mode(false);
})
  .run(['$rootScope','$state', '$stateParams', '$location', function ($rootScope, $state, $stateParams, $location) {
    //parse url parameters for ui-router
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
}]);