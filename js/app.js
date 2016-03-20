'use strict';

//Fichier app.js


var meteoriteApp= angular.module('meteoriteApp',['meteoriteControllers','ngRoute','chart.js']);

meteoriteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/map', {
        templateUrl: 'partials/page_map.html',
        controller: 'mapController as mapC'
      }).
      when('/stat', {
        templateUrl: 'partials/page_stat.html',
        controller: 'statController'
      }).
      otherwise({
        redirectTo: '/map'
      });
  }]);



