'use strict';

// Fichier contenant le controller principal qui englobe le Body. Il gere le chargement du Json
var dataJson;
var meteoriteControllers=angular.module('meteoriteControllers', []);

meteoriteControllers.controller('mainController',['$http','$scope','$location',function($http,$scope,$location){
	
	//Fonction de redirection vers la page "map"
	var currentLocation=$location;	
	function changePath(){
		currentLocation.path('/map');
	}

	$http.get('https://data.nasa.gov/resource/y77d-th95.json')
		.success(function(data){
			console.log("success import json");
			dataJson=data;
			//Une fois que le Json est chargé, on peut rediriger vers la map
			changePath();
		})
		.error(function(errormsg){
			alert("error chargement json");
		})
		
		
		
}]);




