PatientsExercises = new Meteor.Collection("patientsExercises", {
  transform : function(doc) {return new ModelPatientsExercises (doc)}
});

ModelPatientsExercises = function(doc) {
  _.extend(this,doc);
}

_.extend(ModelPatientsExercises.prototype, {
  patient: function(){
    return Meteor.users.findOne({_id: this.patientId});
  },
  exercise: function(){
  	return Exercises.findOne({_id: this.exerciseId});
  },
  nextIndex: function(){
    return +this.index +1;
  }
});