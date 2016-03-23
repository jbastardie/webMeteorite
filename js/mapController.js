angular.module('meteoriteControllers').controller('mapController',['$http','$q','$window','$scope',
	function($http,$q,$window,$scope){
		
		// Decalaration des variables
		//Scope 
		var globalScope=this;
		globalScope.meteorites=[];
		//object map
		var map;
		//un module angulaire
		var zoomSizeMarkers = [[]];
		var markerClusterer;
		var infoMarkers;
		
		
		
		

		
		// Declaration des Fonctions
		
		var initMap=function() {
			console.log('launch init map');
			var center = new google.maps.LatLng(0,0);
			globalScope.meteorites=dataJson;

			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 1,
				center: center,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles:[{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
			});
			placeMarkers();

		};
		
		var placeMarkers = function(){
			console.log('lauch place markers');
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
		};
		
		var createMarker= function(){
			var markerImage = new google.maps.MarkerImage(
				'images/meteorite.png',
				null, //size
				null, //origin
				null, //anchor
				new google.maps.Size(30,30) //scale
			);
			return markerImage;
		};
		
		
		$scope.dropMeteorite= function(i){
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
						$scope.dropMeteorite(i+1);
					}
				}
			},200);
		};
		
		$scope.zoomOnCoordinate = function(lat, lng, zoom) {
			if (typeof(lat) && typeof(lng) != "undefined"){
			  var pt = new google.maps.LatLng(lat, lng);
			  map.setCenter(pt);
			  map.setZoom(zoom);
			 }
			 else{
				alert("Les coordonnées pour cette météorite ne sont pas renseignées");
			 }
		};
		
		
		// Logique du MapController
		// Chargement de l'API GoogleMap si elle n'as pas encore été chargée
		// Sinon juste initialisation de la carte
		if(typeof google!='undefined'){
			initMap();
			
		}else{
			// Load Google map API script
			function loadScript() {  
				// Use global document since Angular's $document is weak
				var script = document.createElement('script');
				//L'url contient un callback sur initMap
				script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDkoHOMb0Rp60-mfLZsv_ncrDI3MSNwnBE&callback=initMap';

				document.body.appendChild(script);
			}

			// Association de l'InitMap du Js et du HTML
			$window.initMap = function () {
				initMap();
			}			
			
			loadScript();

		}
	}
]);