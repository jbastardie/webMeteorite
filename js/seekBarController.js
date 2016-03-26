angular.module('meteoriteControllers').controller('seekBarController', ['$scope', function($scope) {
//set up the slider
	$scope.initSeekBarMass = function(){
		$('#mass').nstSlider({
			"left_grip_selector": ".leftGrip",
			"right_grip_selector": ".rightGrip",
			"value_bar_selector": ".bar",
			"highlight": {
				"grip_class": "gripHighlighted",
				"panel_selector": ".highlightPanel"
			},
			"value_changed_callback": function(cause, leftValue, rightValue) {
				$('.leftLabelMass').text(leftValue + " g");
				$('.rightLabelMass').text(rightValue +  " g");
			},
		});
	};
	
		$scope.initSeekBarYear = function(){
		$('#year').nstSlider({
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
			},
		});
	};
	
	$scope.arrayMassSeekBar = function(){
	var massArray = [];
		for (var i = 0; i < dataJson.length; i++){
			if (typeof(dataJson[i].mass) != "undefined"){
				massArray.push(dataJson[i].mass);
			}
		}
		return massArray;
	}

	$scope.arrayYearSeekBar = function(){
		var yearArray = [];
		for (var i = 0; i < dataJson.length; i++){
			if (typeof(dataJson[i].year) != "undefined"){
				yearArray.push(new Date(dataJson[i].year).getFullYear());	
			}
		}
		return yearArray
	}
	
}]);