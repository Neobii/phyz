var generalPermissions = {
  insert: function(userId, doc, fieldNames, modifier){
    return true;
  },
  update: function(userId, doc, fieldNames, modifier){
    //if (doc.userId !== userId) return false;
    return true;
  },
  remove: function(userId, doc, fieldNames, modifier){
    return true;
  }
};

var PatientsExercisesPermissions = {
  insert: function(){
    if(doc.patientId !== this.userId){
      return true;
    }
  }
}

/*Meteor.users.allow({
  update: function(userId, doc, fieldNames, modifier){
    return doc._id === userId;
  }
});  */

Meteor.users.allow(generalPermissions);
Categories.allow(generalPermissions);
Exercises.allow(generalPermissions);
Syllabi.allow(generalPermissions);
SyllabusExercises.allow(generalPermissions);
PatientsExercises.allow(generalPermissions);
ExerciseMetrics.allow(generalPermissions);