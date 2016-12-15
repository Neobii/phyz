Template.selectAddExercise.events({
	"click [data-action='addSyllabusExercise']" : function(e, t){
    e.preventDefault();
    Meteor.call("incrementSyllabusExercises", Router.current().params._id, +$(e.currentTarget).attr("data-index"))
    SyllabusExercises.insert({
      syllabusId: Router.current().params._id, 
      exerciseId: $(t.find("[name='selectAddExercise']")).val(),
      index: +$(e.currentTarget).attr("data-index")
    });
    Meteor.call("updateExerciseCount", Router.current().params._id);
	}
})