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
		$scope.boxList = [];
		var _that = $scope;


		var category = AV.Object.extend("Category");
		var query = new AV.Query(category);
		query.get(current_category_id,{
			success:function(cate){
				current_category_name = cate.get("name");
			},
			fail:function(object,error){
				alert(error);
			}
		});

		//query box by category_id
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
					box.name = object.get("name");
					box.order = object.get("order_id");
					box.id = object.id;
					_that.boxList.push(box);
					_that.$apply();
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});


		$scope.viewBoxDetail = function(id){
			current_box_id = id;
			$scope.ons.navigator.pushPage("item.html");
		}
	}]);

    app.controller('QRShareCtrl', ['$scope',function($scope){
    	$scope.box_info = null;
    	var _that = $scope;
    	//get current box info
		var box = AV.Object.extend("Box");
		var query = new AV.Query(box);
		query.get(current_box_id,{
			success:function(rc_box){
				var boxinfo = {};
				//alert(rc_box.get("name"));
				boxinfo.name = rc_box.get("name");
				boxinfo.order = rc_box.get("order_id");
				boxinfo.category = current_category_name;
				_that.box_info = boxinfo;
				_that.$apply();
			},
			error:function(object,error){
				alert(error);
			}
		});

    	var base_url = "http://cdug.tongji.edu.cn/demo/index.html?boxid=";
    	var boxid = current_box_id;
    	var url = base_url + boxid;
    	//get current box name,order and category name
		setTimeout(function(){$("#qr-code-gen").qrcode({width:120, height:120, text:url});}, 100);
    }]);

	app.controller('ItemCtrl', ['$scope',function($scope){
		console.log(current_box_id);
		console.log(current_category_name);
		$scope.thingsList = [];
		$scope.box_info = null;
		var _that = $scope;

	  	var box_id = "";
	  	var things = AV.Object.extend("Thing");
	  	var query = new AV.Query(things);
	  	query.equalTo("box_id",current_box_id);
	  	query.find({
	  		success: function(results){
	  			for(var i=0;i<results.length;i++){
	  				var object = results[i];
	  				var thing = {};
	  				thing.id = object.id;
	  				thing.name = object.get("name");
	  				thing.description = object.get("description");
	  				thing.createdAt = object.createdAt;
	  				thing.updatedAt = object.updatedAt;
	  				_that.thingsList.push(thing);
	  				_that.$apply();
	  			}
	  		},
	  		error:function(object,error){
	  			alert(error);
	  		}
	  	});
		
		//get current box info
		var box = AV.Object.extend("Box");
		var query = new AV.Query(box);
		query.get(current_box_id,{
			success:function(rc_box){
				var boxinfo = {};
				//alert(rc_box.get("name"));
				boxinfo.category = current_category_name;
				boxinfo.name = rc_box.get("name");
				boxinfo.order = rc_box.get("order_id");
				_that.box_info = boxinfo;
				_that.$apply();
			},
			error:function(object,error){
				alert(error);
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
})(angular.module('MyBox'));
