SyllabusExercises = new Meteor.Collection("syllabusExercises", {
  transform : function(doc) {return new ModelSyllabusExercises (doc)}
});

ModelSyllabusExercises = function(doc) {
  _.extend(this,doc);
}
_.extend(ModelSyllabusExercises.prototype, {
  syllabus: function(){
    return Syllabi.findOne({_id: this.syllabusId})
  },
  exercise: function(){
    return Exercises.findOne({_id: this.exerciseId})
  },
  nextIndex: function(){
  	return +this.index +1;
  }
});