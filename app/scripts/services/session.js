'use strict';

angular.module('appApp')
  .factory('session', function ($resource) {
    return $resource('/auth/session/');
  });