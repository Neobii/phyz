Syllabi = new Meteor.Collection("syllabi", {
	transform : function(doc) {return new ModelSyllabi (doc)}
});

ModelSyllabi = function(doc) {
  _.extend(this,doc);
}
_.extend(ModelSyllabi.prototype, {
  exercises: function(){
    return SyllabusExercises.find({syllabusId: this._id}, {
      sort: {index: 1}
    })
  }
});

if(Meteor.isClient){
  _.extend(ModelSyllabi.prototype, {
    patientsAssigned: function(){
    	return UserSyllabi.find({syllabusId: this._id, physicianId: Meteor.userId(), active: true})
    },
    getExerciseAt: function(index){
      return this.exercises().fetch()[index];
    },
    nextIndex: function(){
    return +this.index +1;
    }
  });
}