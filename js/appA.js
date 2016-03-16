//scope global
var globalScope;
//object map
var map;
//un module angulaire
var app = angular.module('store',[]);
var zoomSizeMarkers = [[]];
var markerClusterer;
var infoMarkers;


var script = '<script type="text/javascript" src="JS/src/markerclusterer';
      if (document.location.search.indexOf('compiled') !== -1) {
        script += '_compiled';
      }
      script += '.js"><' + '/script>';
      document.write(script);

//controller
app.controller('storeController', ['$http','$log',
		function($http,$log){
		globalScope=this;
		globalScope.meteorites=[];
		$http.get('https://data.nasa.gov/resource/y77d-th95.json')
		.success(function(data){
			console.log("success import json");
			globalScope.meteorites=data;
			placeMarkers()
			
		})
		.error(function(errormsg){
			alert("error chargement json");
		})

	}
]);
  
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
					
				var content = "je suis une météorite!"  
				var infowindow = new google.maps.InfoWindow()
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
	  
	  function dropMeteorites(){
		markerClusterer.clearMarkers();
		for (var i = 0; i < globalScope.meteorites.length; i++) {
		  var meteorite = globalScope.meteorites[i];
		  if (typeof(meteorite.geolocation) != "undefined"){
			  var latLng = new google.maps.LatLng(meteorite.geolocation.coordinates[1],
				  meteorite.geolocation.coordinates[0]);
			setTimeout(function(){
			  var marker = new google.maps.Marker({
				position: latLng,
				icon: createMarker(),
				animation: google.maps.Animation.DROP,
				map: map
				});
			  },200);
			}
        }
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
      