(function(app) {
	app.controller('CategoryCtrl', ['$scope',function($scope){
		
	}]);

	app.controller('BoxCtrl', ['$scope',function($scope){
		
	}]);

	app.controller('ItemCtrl', ['$scope',function($scope){
		$scope.itemList = [{
			"id" : 1,
			"icon" : "icon1",
			"title" : "C++ Primer",
			"time" : "June 29, 2014"
		},{
			"id" : 2,
			"icon" : "icon1",
			"title" : "C++ Primer",
			"time" : "June 29, 2014"
		},{
			"id" : 3,
			"icon" : "icon1",
			"title" : "C++ Primer",
			"time" : "June 29, 2014"
		},{
			"id" : 4,
			"icon" : "icon1",
			"title" : "C++ Primer",
			"time" : "June 29, 2014"
		}];
		$( "#datepicker" ).datepicker();
		$scope.takePicture = function(){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 80,
    			destinationType: Camera.DestinationType.FILE_URI,
    			encodingType: Camera.EncodingType.PNG,
    			correctOrientation: true
			});

			function onSuccess(imageUrl) {
			    var image = document.getElementById('photoImg');
			    image.src = imageUrl;
			}

			function onFail(message) {
			    alert('Failed because: ' + message);
			}
		}
	}]);
})(angular.module('MyBox'));