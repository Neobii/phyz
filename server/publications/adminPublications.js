Meteor.publish("allSyllabus", function(){
  return Syllabi.find();
});

Meteor.publish("adminPhysician", function(adminId){
	return Meteor.users.find({_id: adminId})
});

Meteor.publish("oneExercise", function(exerciseId){
	return Exercises.find({_id: exerciseId})
})

Meteor.publish("exercises", function(exerciseIds){
	return Exercises.find({_id: {$in: exerciseIds}});
})

Meteor.publish("allSyllabi", function(syllabusIds){
	return Syllabi.find({_id: {$in: syllabusIds}});
})

Meteor.publish("oneSyllabus", function(syllabusId){
	return Syllabi.find({_id: syllabusId});
})

Meteor.publish('syllabusExercises', function(syllabusId){
	return SyllabusExercises.find({syllabusId: syllabusId});
});

Meteor.publish("allUsers", function(userId){
  return Meteor.users.find();
});

Meteor.publish("allSyllabusExercises", function(){
  return SyllabusExercises.find({});
});

Meteor.publish("allExercises", function(){
  return Exercises.find();
});

Meteor.publish("physicians", function(){
  return Meteor.users.find({"profile.type": 'physician', "profile.adminId": this.userId});
});