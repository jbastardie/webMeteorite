angular.module('meteoriteControllers').controller('searchBarController', ['$scope', function($scope) {
	$scope.zoomOnMeteorite = function(lat, lng) {
		if (typeof(lat) && typeof(lng) != "undefined"){
		  var pt = new google.maps.LatLng(lat, lng);
		  map.setCenter(pt);
		  map.setZoom(8);
		 }
		 else{
			alert("Les coordonnées pour cette météorite ne sont pas renseignées");
		 }
	};
}]);
