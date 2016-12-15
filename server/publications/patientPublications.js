Meteor.publish("exerciseMetrics", function(exerciseId){
	return ExerciseMetrics.find({});
})
Meteor.publish("onePatientPhysician", function(){
	if(this.userId){
 		var physicianId = Meteor.users.findOne({_id: this.userId}).profile.physicianId
	  return Meteor.users.find({_id: physicianId});
	}
	else{
		this.ready()
	}
});