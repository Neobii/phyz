Template.physicianTemplate.events({
 "click [data-action='addFirstTemplateExercise']" : function(e, t){
    e.preventDefault();
    console.log("hi");
    Meteor.call("incrementSyllabusExercises", Router.current().params._id, 0);
    SyllabusExercises.insert({
      syllabusId: Router.current().params._id, 
      exerciseId: $("[name='selectFirstAddExercise']").val(),//,
      index: 0
    });
    Syllabi.update({_id: Router.current().params._id}, {$inc: {exerciseCount: 1}});
  },
"click [data-action='edit-template']" : function(e, t){
    e.preventDefault();
    //Session.set("physicianEditingTemplate", $(e.currentTarget).attr("data-target-id"));
    Session.set("physicianTemplateEditMode", true);
  },
"click [data-action='cancel-template']" : function(e, t){
    e.preventDefault();
    Session.set("physicianTemplateEditMode", false);
  },
'click [data-action="update-template"]': function(e, t){
    e.preventDefault();
    Syllabi.update({_id: Router.current().params._id},
        {$set: {
            name: $(t.find("[name='editTemplateName']")).val(),
        }});
    Session.set("physicianTemplateEditMode", false);
  },
"click [data-action='makeFromTemplate']" : function(e, t){
  e.preventDefault();
  Meteor.call("physicianMakeFromTemplate", Router.current().params._id, $("[name='syllabiSelect']").val());
}
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
