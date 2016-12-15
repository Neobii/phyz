Template.physicianPatientExercises.events({
  "click [data-action='edit-exercises']" : function(e, t){
    e.preventDefault();
    Session.set("physicianEditPatientExercises", true)
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("physicianEditPatientExercises", false)
  },
  "click [data-action='addFirstSyllabusExercise']" : function(e, t){
    e.preventDefault();
    Meteor.call("incrementPatientExercises", Router.current().params._id, 0);
    PatientsExercises.insert({
      patientId: Router.current().params._id, 
      exerciseId: $(t.find("[name='selectFirstAddExercise']")).val(),
      index: 0
    });
    Meteor.users.update({_id: Router.current().params._id}, {$inc: {"profile.exerciseCount": 1}});
  },
"click [data-action='saveExercises']" : function(e, t){
    e.preventDefault();
    Session.set("physicianEditPatientExercises", false)
  },
"click [data-action='makeFromTemplate']" : function(e, t){
  e.preventDefault();
  Meteor.call("physicianAssignSyllabus", Router.current().params._id, $("[name='syllabiSelect']").val());
}
});