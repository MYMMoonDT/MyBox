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
				current_box_order_id = results.length;
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

		queryCategoriesAndBoxesByUserId(user_id);
		setTimeout(function () {
			console.log(category_box_list);
			console.log(box_id_list);
			var html_code = '';
			for (var i=0; i<category_box_list.length; ++i) {
				html_code += '<option value="'+i+'"';
				if (i == 0) html_code += 'selected = "selected"';
				html_code += '>'+category_box_list[i]+'</option>';
			}
			$("#belong_box_option").html(html_code);
		}, 2000);

		$scope.confirm = function(){
			var name = $scope.itemName;
			var description = $scope.itemDescription;
			var belongBox = parseInt($scope.belongBox);
			if (!belongBox) belongBox = 0;
			var price = $scope.itemPrice;
			var date = $("#datepicker").val();

			var Thing = AV.Object.extend("Thing");
			var thing = new Thing();
			thing.set("box_id", box_id_list[belongBox]);
			thing.set("name", name);
			thing.set("description", description);
			thing.set("price", price);
			thing.set("image", "");
			thing.save(null, {
				success: function(thing) {
					_that.ons.navigator.popPage();
				},
				error: function(thing, error) {
					alert('Failed to create new object, with error code: ' + error.description);
				}
			});
		}
	}]);

	app.controller('CategoryCreateCtrl', ['$scope', function($scope){
		var _that = $scope;
		$("#createCategoryButton").click(function(){
			var Category = AV.Object.extend("Category");
			var category = new Category();
			category.set("user_id", user_id);
			category.set("name", $scope.categoryName);
			category.set("color", "#1f1f1f");
			category.set("image", "");
			category.save(null, {
				success: function(category) {
					// Execute any logic that should take place after the object is saved.
					//alert('New object created with objectId: ' + category.id);
					_that.ons.navigator.popPage();
				},
				error: function(category, error) {
					// Execute any logic that should take place if the save fails.
					// error is a AV.Error with an error code and description.
					//alert('Failed to create new object, with error code: ' + error.description);
				}
			});
		});
	}]);

	app.controller('BoxCreateCtrl', ['$scope', function($scope){
		var _that = $scope;

		$("#createBoxButton").click(function(){
			var temp_order_id = current_box_order_id + 1;

			var Box = AV.Object.extend("Box");
			var box = new Box();
			box.set("name", _that.boxName);
			box.set("order_id", "" + temp_order_id);
			box.set("category_id", current_category_id);
			box.set("category_name", current_category_name);
			box.set("image", "");
			box.save(null, {
				success: function(box) {
					// Execute any logic that should take place after the object is saved.
					//alert('New object created with objectId: ' + box.id);
					_that.ons.navigator.popPage();
				},
				error: function(box, error) {
					// Execute any logic that should take place if the save fails.
					// error is a AV.Error with an error code and description.
					//alert('Failed to create new object, with error code: ' + error.description);
				}
			});
		});
	}]);
})(angular.module('MyBox'));
