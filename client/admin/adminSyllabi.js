Template.adminSyllabi.events({
  "click [data-action='add-syllabus']" : function(e, t){
    e.preventDefault();
    var newSyllabus = {};
    newSyllabus.name = $("[name='syllabusName']").val();
    newSyllabus.slug = App.convertToSlug(newSyllabus.name);
    newSyllabus.exerciseCount = 0;
    Syllabi.insert(newSyllabus);
    $("[name='syllabusName']").val('');

  }
});

Template.syllabusListComp.events({
    "click [data-action='delete-syllabus']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Syllabi.remove({_id: $(e.currentTarget).attr("data-target-id")});
  },
  "click [data-action='edit-syllabus']" : function(e, t){
    e.preventDefault();
    //Session.set("adminEditingSyllabus", $(e.currentTarget).attr("data-target-id"));
    Router.go("adminSyllabus", {_id: $(e.currentTarget).attr("data-target-id")});
    Session.set("adminSyllabusEditMode", true);
  }
})