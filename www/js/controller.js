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
	}]);
})(angular.module('MyBox'));