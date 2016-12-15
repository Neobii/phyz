Template.adminSyllabus.events({
 "click [data-action='addFirstSyllabusExercise']" : function(e, t){
    e.preventDefault();
    Meteor.call("incrementSyllabusExercises", Router.current().params._id, 0);
    SyllabusExercises.insert({
      syllabusId: Router.current().params._id, 
      exerciseId: $("[name='selectFirstAddExercise']").val(),//,
      index: 0
    });
    Syllabi.update({_id: Router.current().params._id}, {$inc: {exerciseCount: 1}});
  },
"click [data-action='edit-syllabus']" : function(e, t){
    e.preventDefault();
    //Session.set("adminEditingSyllabus", $(e.currentTarget).attr("data-target-id"));
    Session.set("adminSyllabusEditMode", true);
  },
"click [data-action='cancel-syllabus']" : function(e, t){
    e.preventDefault();
    Session.set("adminSyllabusEditMode", false);
  },
'click [data-action="update-syllabus"]': function(e, t){
    e.preventDefault();
    Syllabi.update({_id: Router.current().params._id},
        {$set: {
            name: $(t.find("[name='editSyllabusName']")).val(),
        }});
    Session.set("adminSyllabusEditMode", false);
  },
});

Template.editingVideoSyllabusComp.events({
  "click [data-action='adminDeleteExercise']" : function(e, t){
    e.preventDefault();
    Meteor.call("deleteExercise", Router.current().params._id, $(e.currentTarget).attr("data-index"));
    SyllabusExercises.remove({_id: $(e.currentTarget).attr("data-target-id")});
  },
  "click [data-action='adminMoveUp']" : function(e, t){
    e.preventDefault();
    Meteor.call("moveExerciseUp", Router.current().params._id, $(e.currentTarget).attr("data-index"));
  },
  "click [data-action='adminMoveDown']" : function(e, t){
    e.preventDefault();
    Meteor.call("moveExerciseDown", Router.current().params._id, $(e.currentTarget).attr("data-index"));
  },

});
