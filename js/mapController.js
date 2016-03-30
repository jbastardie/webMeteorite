angular.module('meteoriteControllers').controller('mapController',['$http','$q','$window','$scope',
	function($http,$q,$window,$scope){
		
		// Decalaration des variables
		//Scope 
		var globalScope=this;
		globalScope.meteorites=[];
		//object map
		var map;
		//marker clusterer pour les regroupements de marker
		var markerClusterer;
		//tableau de marker pour le mode dropMeteorite
		var markers = [];
		//interval de temps pour la répétition de la fonction dropmeteorite.
		var intervalForDropMeteorite;
		//carte en mode drop météorite ou classique
		var isDropping = false;
		//variable d'incrémentation pour la répétition de l'éxecution de la fonction dropMeteorite
		var variableForIncrementMeteorite = 0;

		
		// Declaration des Fonctions
		
		//initialisationde la carte
		var initMap=function() {
			console.log('launch init map');
			var center = new google.maps.LatLng(0,0);
			globalScope.meteorites=dataJson;

			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 1,
				center: center,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles:[{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}],
				backgroundColor: 'none'
			});
			placeMarkers();
		};
		
		var placeMarkers = function(massMin,massMax,yearMin,yearMax){
			console.log('lauch place markers');
			//creation de notre tableau de marker
			var markers = []
			//parcours des données extraites du json
			for (var i = 0; i < globalScope.meteorites.length; i++) {
			  var meteorite = globalScope.meteorites[i];
			  //extraction de la masse et de l'année de la météorite pour comparaison avec les filtres 
			  var massMeteorite = meteorite.mass;
			  var yearMeteorite = new Date(meteorite.year).getFullYear();
			  //condition vérifiant si la métorite possède bien une géolocalisation, et si elle est conforme aux filtres d'affichages défini par l'utilisateur.
			  if((typeof(meteorite.geolocation) != "undefined") && massMeteorite >= massMin && massMeteorite <= massMax && 
			  yearMeteorite >= yearMin && yearMeteorite <= yearMax || ((typeof(meteorite.geolocation) != "undefined") && typeof(massMin)=="undefined")){
					//creation des markers et ajout dans le tableau de marker
					markers.push(createContentMarker(meteorite));
				}
			}
			markerClusterer = new MarkerClusterer(map, markers);
		};
		
		var markerImage = function(){
			var markerImage = new google.maps.MarkerImage(
				'images/meteorite.png',
				null, //size
				null, //origin
				null, //anchor
				new google.maps.Size(30,30) //scale
			);
			return markerImage;
		};
		
		//crée un marker avec son contenu
		var createContentMarker = function(meteorite){
			var latLng = new google.maps.LatLng(meteorite.geolocation.coordinates[1], meteorite.geolocation.coordinates[0]);
			var marker = new google.maps.Marker({
				position: latLng,
				icon: markerImage()
			});
			var content = "masse: "+ meteorite.mass+" g & nom: " + meteorite.name;
			var infowindow = new google.maps.InfoWindow();
			google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
				return function() {
					infowindow.setContent(content);
					infowindow.open(map,marker);
				};
			})(marker,content,infowindow)); 
			return marker;
		}
		
		//fonction permettant de recharger les markers ansi que le markerclusterer en fonction des données des sliders
		$scope.reloadMarkers = function(){
			markerClusterer.clearMarkers();
			placeMarkers($('#massSlider').nstSlider('get_current_min_value'),$('#massSlider').nstSlider('get_current_max_value'),
			$('#yearSlider').nstSlider('get_current_min_value'),$('#yearSlider').nstSlider('get_current_max_value'));
		}
		
		//fonction gerant la chute des météorites
		$scope.startStopDropMeteorite = function(){
			if(isDropping){
				clearInterval(intervalForDropMeteorite);
				  for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(null);
				  }
				placeMarkers();
				isDropping = false;
				document.getElementById("dropMeteorite").value = "drop météorites";
			}
			else{
				markerClusterer.clearMarkers();
				intervalForDropMeteorite = setInterval(function(){ dropMeteorite() }, 200);
				isDropping = true;
				document.getElementById("dropMeteorite").value = "stop drop meteorites";
			}
		}
		//fonction appelé à intervalle régulier pour faire tomber les météorites sur la carte
		function dropMeteorite(){
			var meteorite = globalScope.meteorites[variableForIncrementMeteorite];
			if (typeof(meteorite.geolocation) != "undefined"){
				var marker = createContentMarker(meteorite)
				marker.setAnimation(google.maps.Animation.DROP);
				markers.push(marker);
				markers[variableForIncrementMeteorite].setMap(map);
				if (variableForIncrementMeteorite < globalScope.meteorites.length){
					variableForIncrementMeteorite = variableForIncrementMeteorite + 1;
				}
				else {
					clearInterval(intervalForDropMeteorite);
				}
			}
		}
		
		//zoom sur les coordonnées transmise en argumant pour un zoom donné.
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