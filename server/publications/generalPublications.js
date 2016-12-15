// Publications

Meteor.publish("oneUser", function(oneUserId){
	return Meteor.users.find({_id : oneUserId});
	});

Meteor.publish("allCategories", function(){
  return Categories.find();
});

Meteor.publish("exerciseByCategory", function(categoryId){
	return (!categoryId)?Exercises.find({}):Exercises.find({categoryId: categoryId});
})