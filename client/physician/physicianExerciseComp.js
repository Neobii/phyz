Template.physicianExerciseComp.events({
	"click [data-action='set-current-exercise']" : function(e, t){
		//$(e.currentTarget).attr("data-target-id")
	},
	"click [data-action='unassign-exercise']" : function(e, t){
		var peId = PatientsExercises.findOne({
			patientId: $(e.currentTarget).attr("data-target-id"),
			exerciseId: Router.current().params._id,
		})._id;
		PatientsExercises.remove({_id: peId});
		Meteor.users.update({_id: $(e.currentTarget).attr("data-target-id")}, 
			{$inc: {"profile.exerciseCount": -1}});
	}
})