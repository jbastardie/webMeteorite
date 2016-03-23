angular.module('meteoriteControllers').controller('seekBarController', ['$scope', function($scope) {
//set up the slider
	$scope.initSeekBar = function(){
		$('.nstSlider').nstSlider({
			"left_grip_selector": ".leftGrip",
			"right_grip_selector": ".rightGrip",
			"value_bar_selector": ".bar",
			"highlight": {
				"grip_class": "gripHighlighted",
				"panel_selector": ".highlightPanel"
			},
			"value_changed_callback": function(cause, leftValue, rightValue) {
				$('.leftLabel').text(leftValue + " g");
				$('.rightLabel').text(rightValue +  " g");
			},
		});
	};
	
	$scope.maxMassSeekBar = function(){
	var massArray = [];
	 for (var i = 0; i < dataJson.length; i++){
		 if (typeof(dataJson[i].mass) != "undefined"){
				massArray.push(dataJson[i].mass);
			}
		}
		return massArray;
	}
}]);