var user_id;
var current_category_id;
var current_category_name;
var current_box_id;

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
				// saveCategory(user.id, "test_category", "test_color", "");
				// saveBox("53b81c4ae4b020cb6a8e2eb6", "test_box", "1", "");
				// saveThing("53b8321be4b020cb6a8e4931", "test_thing", "des_thing", "$4.5", "");
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

function saveBox(category_id, name, order_id, image){
	var Box = AV.Object.extend("Box");
	var box = new Box();
	box.set("name", name);
	box.set("order_id", order_id);
	box.set("category_id", category_id);
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