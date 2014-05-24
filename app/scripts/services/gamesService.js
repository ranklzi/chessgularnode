'use strict';

angular.module('appApp')
  .factory('gamesService', function ($resource) {
    return $resource('/api/games/');
  });