var user_id;
var current_category_id;
var current_category_name;
var current_box_name;
var current_box_id;
var current_box_order_id;

var category_box_list = [];
var box_id_list = [];

(function(){
	'use strict';
	angular.module('MyBox', ['onsen.directives'])
	.run(function(){
		AV.$ = jQuery;
		AV.initialize("1ud9hn2wmc3whojbzarpys9w2q74ft6bwu5snkg21w8cfmnp", "v6b7vntwjvh1rmyoy89s28vufo5prmv2su9wihemmbhpwq9x");

		AV.User.logIn("jingpeng", "123456", {
			success: function(user) {
				user_id = user.id;
				// Do stuff after successful login.
				//saveCategory(user.id, "test_category", "test_color", "");
				//saveBox("53b8a288e4b0cdeb6e26d42a", "test_box", "1", "");
				//saveThing("53b8a288e4b0cdeb6e26d42a", "test_thing", "des_thing", "$4.5", "");
			},
			error: function(user, error) {
				// The login failed. Check error to see why.
			}
		});
	});

})();

$(function() {
    $( "#datepicker" ).datepicker();
});

function saveCategory(user_id, name, color, image){
	var Category = AV.Object.extend("Category");
	var category = new Category();
	category.set("user_id", user_id);
	category.set("name", name);
	category.set("color", color);
	category.set("image", image);
	category.save(null, {
		success: function(category) {
			// Execute any logic that should take place after the object is saved.
			alert('New object created with objectId: ' + category.id);
		},
		error: function(category, error) {
			// Execute any logic that should take place if the save fails.
			// error is a AV.Error with an error code and description.
			alert('Failed to create new object, with error code: ' + error.description);
		}
	});
}

function saveBox(category_id, name, category_name, order_id, image){
	var Box = AV.Object.extend("Box");
	var box = new Box();
	box.set("name", name);
	box.set("order_id", order_id);
	box.set("category_id", category_id);
	box.set("category_name", category_name);
	box.set("image", image);
	box.save(null, {
		success: function(box) {
			// Execute any logic that should take place after the object is saved.
			alert('New object created with objectId: ' + box.id);
		},
		error: function(box, error) {
			// Execute any logic that should take place if the save fails.
			// error is a AV.Error with an error code and description.
			alert('Failed to create new object, with error code: ' + error.description);
		}
	});
}

function saveThing(box_id, name, description, price, image){
	var Thing = AV.Object.extend("Thing");
	var thing = new Thing();
	thing.set("box_id", box_id);
	thing.set("name", name);
	thing.set("description", description);
	thing.set("price", price);
	thing.set("image", image);
	thing.save(null, {
		success: function(thing) {
			// Execute any logic that should take place after the object is saved.
			alert('New object created with objectId: ' + thing.id);
		},
		error: function(thing, error) {
			// Execute any logic that should take place if the save fails.
			// error is a AV.Error with an error code and description.
			alert('Failed to create new object, with error code: ' + error.description);
		}
	});
}

function queryCategoriesByUserId(user_id){
	var Category = AV.Object.extend("Category");
	var query = new AV.Query(Category);
	query.equalTo("user_id", user_id);
	query.find({
		success: function(results) {
			alert("Successfully retrieved " + results.length + " scores.");
			// Do something with the returned AV.Object values
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				alert(object.id + ' - ' + object.get('name'));
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function queryCategoriesAndBoxesByUserId(user_id){
	category_box_list = [];
	box_id_list = [];
	var Category = AV.Object.extend("Category");
	var categoryQuery = new AV.Query(Category);
	categoryQuery.equalTo("user_id", user_id);
	categoryQuery.find({
		success: function(category_results) {
			// alert("Successfully retrieved " + results.length + " scores.");
			// Do something with the returned AV.Object values
			for (var i = 0; i < category_results.length; i++) {
				var category = category_results[i];
				var Box = AV.Object.extend("Box");
				var query = new AV.Query(Box);
				query.equalTo("category_id", category.id);
				query.find({
					success: function(box_results) {
						// alert("Successfully retrieved " + results.length + " scores.");
						// Do something with the returned AV.Object values
						for (var j = 0; j < box_results.length; j++) {
							var object = box_results[j];
							category_box_list.push(object.get('category_name')+ ":" + object.get('name'));
							box_id_list.push(object.id);
						}
					},
					error: function(error) {
						alert("Error: " + error.code + " " + error.message);
					}
				});
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function queryBoxesByCategoryId(category_id){
	var Box = AV.Object.extend("Box");
	var query = new AV.Query(Box);
	query.equalTo("category_id", category_id);
	query.find({
		success: function(results) {
			alert("Successfully retrieved " + results.length + " scores.");
			// Do something with the returned AV.Object values
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				//alert(object.id + ' - ' + object.get('name'));
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function queryThingsByBoxId(box_id){
	var Thing = AV.Object.extend("Thing");
	var query = new AV.Query(Thing);
	query.equalTo("box_id", box_id);
	query.find({
		success: function(results) {
			alert("Successfully retrieved " + results.length + " scores.");
			// Do something with the returned AV.Object values
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				alert(object.id + ' - ' + object.get('name'));
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}