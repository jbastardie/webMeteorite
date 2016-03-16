'use strict';

//Fichier app.js


var meteoriteApp= angular.module('meteoriteApp',['meteoriteControllers','ngRoute']);

meteoriteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/map', {
        templateUrl: 'partials/page_map.html',
        controller: 'mapController'
      }).
      when('/stat', {
        templateUrl: 'partials/page_stat.html',
        controller: 'statController'
      }).
      otherwise({
        redirectTo: '/map'
      });
  }]);



