angular.module('meteoriteControllers').controller('seekBarController', ['$scope', function($scope) {

	//set up du slider des masses
	$scope.initSeekBarMass = function(){
		$('#massSlider').nstSlider({
			"left_grip_selector": ".leftGrip",
			"right_grip_selector": ".rightGrip",
			"value_bar_selector": ".bar",
			"highlight": {
				"grip_class": "gripHighlighted",
				"panel_selector": ".highlightPanel"
			},
			"value_changed_callback": function(cause, leftValue, rightValue){
				$('.leftLabelMass').text(leftValue + " g");
				$('.rightLabelMass').text(rightValue + " g");
			},
		});
	};
	//set up du slider des années
	$scope.initSeekBarYear = function(){
		$('#yearSlider').nstSlider({
			"left_grip_selector": ".leftGrip",
			"right_grip_selector": ".rightGrip",
			"value_bar_selector": ".bar",
			"highlight": {
				"grip_class": "gripHighlighted",
				"panel_selector": ".highlightPanel"
			},
			"value_changed_callback": function(cause, leftValue, rightValue) {
				$('.leftLabelYear').text(leftValue);
				$('.rightLabelYear').text(rightValue);
				massMax = leftValue;
			},
		});
	};
	
	//retourne le tableau des masses des météorites
	$scope.arrayMassSeekBar = function(){
	var massArray = [];
		for (var i = 0; i < dataJson.length; i++){
			if (typeof(dataJson[i].mass) != "undefined" && typeof(dataJson[i].year) != "undefined" && typeof(dataJson[i].geolocation) != "undefined"){
				massArray.push(dataJson[i].mass);
			}
		}
		return massArray;
	}

	//retourne le tableau des années des chutes de météorites
	$scope.arrayYearSeekBar = function(){
		var yearArray = [];
		for (var i = 0; i < dataJson.length; i++){
			if (typeof(dataJson[i].year) != "undefined" && typeof(dataJson[i].mass) != "undefined" && typeof(dataJson[i].geolocation) != "undefined"){
				yearArray.push(new Date(dataJson[i].year).getFullYear());	
			}
		}
		return yearArray
	}
	
}]);