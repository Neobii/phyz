Template.physicianTemplates.events({
  "click [data-action='add-template']" : function(e, t){
    e.preventDefault();
    var newSyllabus = {};
    newSyllabus.name = $("[name='templateName']").val();
    newSyllabus.slug = App.convertToSlug(newSyllabus.name);
    newSyllabus.exerciseCount = 0;
    newSyllabus.id = Meteor.userId();
    Syllabi.insert(newSyllabus);
    $("[name='syllabusName']").val('');
    console.log(newSyllabus.name);
    console.log(newSyllabus.id);

  }
});

Template.templateListComp.events({
    "click [data-action='delete-template']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Syllabi.remove({_id: $(e.currentTarget).attr("data-target-id")});
  },
  "click [data-action='edit-template']" : function(e, t){
    e.preventDefault();
    //Session.set("adminEditingSyllabus", $(e.currentTarget).attr("data-target-id"));
    console.log($(e.currentTarget).attr("data-target-id"));
    Router.go("physicianTemplate", {_id: $(e.currentTarget).attr("data-target-id")});
    Session.set("physicianTemplateEditMode", true);
  }
})