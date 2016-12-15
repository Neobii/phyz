ExerciseMetrics = new Meteor.Collection("exerciseMetrics", {
  transform : function(doc) {return new ModelExerciseMetric (doc)}
});

ModelExerciseMetric = function(doc) {
  _.extend(this,doc);
}

_.extend(ModelExerciseMetric.prototype, {
  patient: function(){
    return Meteor.users.findOne({_id: this.patientId});
  },
  exercise: function(){
  	return Exercises.findOne({_id: this.exerciseId});
  }
});