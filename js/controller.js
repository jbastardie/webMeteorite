'use strict';
//scope global
var globalScope;
//object map
var map;
//un module angulaire
var zoomSizeMarkers = [[]];
var markerClusterer;
var infoMarkers;

// Fichier contenant les Controller controller.js

var meteoriteControllers=angular.module('meteoriteControllers', []);

meteoriteControllers.controller('mapController',['$http','$log',
	function($http,$log){
		globalScope=this;
		globalScope.meteorites=[];
		$http.get('https://data.nasa.gov/resource/y77d-th95.json')
		.success(function(data){
			console.log("success import json");
			globalScope.meteorites=data;
			initMap();
			placeMarkers();
			
		})
		.error(function(errormsg){
			alert("error chargement json");
		})		

	}
]);

meteoriteControllers.controller('statController',function ($scope) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});

meteoriteControllers.controller('searchBar', ['$scope', function($scope) {
	$scope.zoomOnMeteorite = function(lat, lng) {
		if (typeof(lat) && typeof(lng) != "undefined"){
		  var pt = new google.maps.LatLng(lat, lng);
		  map.setCenter(pt);
		  map.setZoom(8);
		 }
		 else{
			alert("Les coordonnées pour cette météorite ne sont pas renseignées")
		 }
	};
}]);

function initMap() {
	var center = new google.maps.LatLng(0,0);

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 1,
		center: center,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles:[{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
	});
  }
  
function placeMarkers(){
	var markers = []
	for (var i = 0; i < globalScope.meteorites.length; i++) {
	  var meteorite = globalScope.meteorites[i];
	  if (typeof(meteorite.geolocation) != "undefined"){
		 var latLng = new google.maps.LatLng(meteorite.geolocation.coordinates[1],
			 meteorite.geolocation.coordinates[0]);
			var marker = new google.maps.Marker({
			position: latLng,
			icon: createMarker()
			});
				
			var content = "masse: "+ meteorite.mass+" g & nom: " + meteorite.name;
			var infowindow = new google.maps.InfoWindow();
			google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
					return function() {
					   infowindow.setContent(content);
					   infowindow.open(map,marker);
					};
				})(marker,content,infowindow)); 
			markers.push(marker);
		}
	}
	markerClusterer = new MarkerClusterer(map, markers);
}

function createMarker(){
	var markerImage = new google.maps.MarkerImage(
		'images/meteorite.png',
		null, //size
		null, //origin
		null, //anchor
		new google.maps.Size(30,30) //scale
	);
	return markerImage;
}


function dropMeteorite(i){
	if (i == 0){
		markerClusterer.clearMarkers();
	}
	setTimeout(function(){
		var meteorite = globalScope.meteorites[i];
		if (typeof(meteorite.geolocation) != "undefined"){
			
			var latLng = new google.maps.LatLng(meteorite.geolocation.coordinates[1],
				  meteorite.geolocation.coordinates[0]);
			var marker = new google.maps.Marker({
				position: latLng,
				icon: createMarker(),
				animation: google.maps.Animation.DROP,
				map: map
			});
			  
			if (i < globalScope.meteorites.length){
				dropMeteorite(i+1);
			}
		}
	},200);
}
