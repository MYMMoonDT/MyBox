(function(app) {
	app.controller('CategoryCtrl', ['$scope',function($scope){
		
	}]);

	app.controller('BoxCtrl', ['$scope',function($scope){

	}]);

    app.controller('QRShareCtrl', ['$scope',function($scope){
	setTimeout(function(){$("#qr-code-gen").qrcode({width:120, height:120, text:"http://jetienne.com"});}, 100);
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
	}]);
})(angular.module('MyBox'));
