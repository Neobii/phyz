Template.physicianExercises.events({
  "click [data-action='adminAddExercise']" : function(e, t){
    e.preventDefault();
    var exerciseId = Exercises.insert({
        name: "New Exercise"
    });
    Session.set('adminEditingExercise', true);
    Router.go('physicianExercise', {_id: exerciseId});
  },
  "change [name='selectSearchCategory']" : function(e, t){
    e.preventDefault();
    if($(e.currentTarget).val() !== "all"){
      Router.go("physicianExercises", {categoryId: $(e.currentTarget).val()});
    }
    else{
      Router.go("physicianExercises");
    }
  }

});
Template.Exercise.activeVideo = function(){
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