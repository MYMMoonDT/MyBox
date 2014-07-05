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
		$scope.boxList = [];
		var _that = $scope;

		var Box = AV.Object.extend("Box");
		var query = new AV.Query(Box);
		query.equalTo("category_id", current_category_id);
		query.find({
			success: function(results) {
				//alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned AV.Object values
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					//alert(object.id + ' - ' + object.get('name'));

					var box = {};
					box.name = object.get('name');
					box.id = object.id;
					_that.boxList.push(box);
					_that.$apply();
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

		$scope.viewBoxDetail = function(id,name){
			current_box_id = id;
			current_box_name = name;
			$scope.ons.navigator.pushPage("item.html");
		}
	}]);

    app.controller('QRShareCtrl', ['$scope',function($scope){
	setTimeout(function(){$("#qr-code-gen").qrcode({width:120, height:120, text:"http://jetienne.com"});}, 100);
    }]);

	app.controller('ItemCtrl', ['$scope',function($scope){
		$scope.itemList = [];
		$scope.boxName =  current_box_name;
		var _that = $scope;

		var Thing = AV.Object.extend("Thing");
		var query = new AV.Query(Thing);
		query.equalTo("box_id", current_box_id);
		query.find({
			success: function(results) {
				//alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned AV.Object values
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					//alert(object.id + ' - ' + object.get('name'));

					var thing = {};
					thing.id = object.id;
					thing.name = object.get('name');
					thing.description = object.get('description');
					thing.price = object.get('price');
					_that.itemList.push(thing);
					_that.$apply();

				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});

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

	app.controller('CategoryCreateCtrl', ['$scope', function($scope){
		$(".onsen_navigator__right-button").click(function(){
			$scope.ons.navigator.popPage();
		});
	}]);
})(angular.module('MyBox'));
