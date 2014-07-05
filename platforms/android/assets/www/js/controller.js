(function(app) {
	app.controller('CategoryCtrl', ['$scope',function($scope){
		$scope.categoryList = [];
		var _that = $scope;

		var Category = AV.Object.extend("Category");
		var query = new AV.Query(Category);
		query.equalTo("user_id", user_id);
		query.find({
			success: function(results) {
				//alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned AV.Object values
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					//alert(object.id + ' - ' + object.get('name'));
					
					var category = {};
					category.color = object.get('color');
					category.name = object.get('name');
					category.id = object.id;
					_that.categoryList.push(category);
					_that.$apply();
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		$scope.viewCategoryDetail = function(id) {
			current_category_id = id;
			$scope.ons.navigator.pushPage("box.html");
		}
	}]);

	app.controller('BoxCtrl', ['$scope',function($scope){
		console.log(current_category_id);
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
