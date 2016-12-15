Template.physicianExercise.activeVideo = function(){
    if(!this.vimeo){
        if(!Router.current().data().exercise().vimeoId){
            return false;
        }
        this.vimeo = new Vimeo([
            Router.current().data().exercise().vimeoId
        ]);
    }
    return this.vimeo.getVideos()[0];
}
Template.physicianExercise.events({
	'click [data-action="new-set-current-exercise"]' : function(e, t){
		var patient = Meteor.users.findOne({_id: $("[name='addPatient']").val()});
		if(patient){
			Meteor.call("insertExerciseToCurrent", patient._id, Router.current().params._id)
		}
		//needs to increase all other exercises above current index
	},
	'click [data-action="assign-exercise"]' : function(e, t){
		var patient = Meteor.users.findOne({_id: $("[name='addPatient']").val()});
		if(patient){
			Meteor.call("insertExerciseToEnd", patient._id, Router.current().params._id)
		}
		//PatientsExercises.insert({patientId: patient._id, exerciseId: Router.current().params._id, index: patient.profile.exerciseCount});
	}
});
