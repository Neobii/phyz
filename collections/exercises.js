Exercises = new Meteor.Collection("exercises", {
    transform : function(doc) {return new ModelExercise (doc)}
});

ModelExercise = function(doc) {
  _.extend(this,doc);
}

if(Meteor.isClient){
  _.extend(ModelExercise.prototype, {
    category: function(){
      return Categories.findOne({_id: this.categoryId})
    },
    patientsAssigned: function(){
    	var patients = _.pluck(PatientsExercises.find({exerciseId: this._id}).fetch(), "patientId")
      return Meteor.users.find({_id: {$in: patients}, "profile.type": "patient"});
    },
    patientsNotAssigned: function(){
      var patients = _.pluck(PatientsExercises.find({exerciseId: this._id}).fetch(), "patientId")
      return Meteor.users.find({_id: {$nin: patients}, "profile.type": "patient"});
    },
    metrics: function(){
      return ExerciseMetrics.findOne({patientId: Meteor.userId(), exerciseId: this._id});
    },
    syllabi: function(){
      return SyllabusExercises.find({exerciseId: this._id});
    },
    getPatientStatus: function(patientId){
      return PatientsExercises.findOne({patientId: patientId, exerciseId: this._id}).status || "incomplete";
    },
    getPatientRating: function(patientId){
      var em = ExerciseMetrics.findOne({patientId: patientId, exerciseId: this._id});
      return (em)? em.rating : "unrated";
    },
    getPatientCompletedDate: function(patientId){
      var completedDate = PatientsExercises.findOne({patientId: patientId, exerciseId: this._id}).completed || "";
      return App.prettifyDate(completedDate);
    }
  });
}
