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
	  when('/', {
        templateUrl: 'partials/loader.html',
        controller: ''
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

  
//custom filter which return the max value of an array
meteoriteApp.filter('max', function() {
    return function(input) {
      var out = 0;
      if (input){
        for (var i = 0; i < input.length; i++) {
          if (Number(input[i]) > out) {
            out = Number(input[i]);
          }
        }
      }
      return out;
    };
  }
);

meteoriteApp.filter('min', function() {
    return function(input) {
      var out;
      if (input){
        for (var i = 0; i < input.length; i++) {
          if (Number(input[i]) < out || typeof(out) == "undefined") {
            out = Number(input[i]);
          }
        }
      }
      return out;
    };
  }
);



