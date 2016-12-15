Template.CurrentExercise.activeVideo = function(){
    if(!this.vimeo){
        if(!this.vimeoId){
            return false;
        }
        this.vimeo = new Vimeo([
            this.vimeoId
        ]);
    }
    return this.vimeo.getVideos()[0];
}
Template.CurrentExercise.events({
  "click [data-action='exerciseDone']" : function(){
    var completedAt = moment(new Date()).toISOString();
    var time = App.prettifyDate(completedAt);
    //var exId = this.exerciseId;
    PatientsExercises.update({_id: this._id}, {$set: {
        status: "complete",
        completed: completedAt
        }});
    Meteor.users.update({_id: Meteor.userId()}, {$inc: {"profile.exerciseIndex": 1}});
    if(Meteor.user().profile.exerciseIndex >= Meteor.user().profile.exerciseCount){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
            "profile.completedSyllabus": moment(new Date()).toISOString()
        }})
      Router.go("dashboard");
    };
    var patientId = Meteor.userId();
  //  var physician = Meteor.user().patientPhysician();
    Meteor.call("completeExerciseEmail", patientId, this.exerciseId, time)
  }
});
