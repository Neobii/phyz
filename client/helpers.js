UI.registerHelper("prettifyDate", function(timestamp) {
 App.prettifyDate(timestamp);
});



UI.registerHelper("currentUserEmail", function() {
	if(Meteor.user())
		return Meteor.user().emails[0].address;
});

UI.registerHelper("currentRouteIs", function(routeName){
  return Router.current().route.name === routeName;
});

UI.registerHelper("allCategories", function(){
  return Categories.find();
});

UI.registerHelper("allExercises", function(){
  return Exercises.find();
});



/*UI.registerHelper("userPhysician", function() {
	if(Meteor.user.profile.isPhysician(true))
		return true;
});*/