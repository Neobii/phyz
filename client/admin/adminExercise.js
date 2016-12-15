
Template.adminExercise.events({
"click [data-action='cancelEditExercise']" : function(e, t){
    e.preventDefault();
  //  Router.go('adminExercises');
    Session.set("adminEditingExercise", false);
  },
"click [data-action='saveEditExercise']" : function(e, t){
    e.preventDefault();
    Exercises.update({_id: Router.current().params._id},
        {$set: {
            name: $("[name='adminEditExerciseName']").val(),
            vimeoId: $("[name='adminEditVimeoId']").val(),
            categoryId: $("[name='exerciseCategory']").val()
        }});
    Session.set("adminEditingExercise", false);
  },
"click [data-action='adminEditExercise']" : function(e, t){
    e.preventDefault();
    Router.go('adminExercise', {_id: $(e.currentTarget).attr("data-target-id")});
    Session.set("adminEditingExercise", true);
  },
"click [data-action='adminDeleteExercise']" : function(e, t){
    e.preventDefault();
    Router.go('adminExercises');
    Exercises.remove({_id: $(e.currentTarget).attr("data-target-id")});
  }
})
Template.adminExercise.activeVideo = function(){
    if(!this.vimeo){
        if(!Router.current().data().exercise().vimeoId){
            return false;
        }
        this.vimeo = new Vimeo([
            Router.current().data().exercise().vimeoId
        ]);
    }
    return this.vimeo.getVideos()[0];
}
