Template.adminExercises.events({
  "click [data-action='adminAddExercise']" : function(e, t){
    e.preventDefault();
    var exerciseId = Exercises.insert({
        name: "New Exercise",
        totalRating: {
          good: 0,
          neutral: 0,
          bad: 0
        }
    });
    Session.set('adminEditingExercise', true);
    Router.go('adminExercise', {_id: exerciseId});
  },
  "change [name='selectSearchCategory']" : function(e, t){
    e.preventDefault();
    if($(e.currentTarget).val() !== "all"){
      Router.go("adminExercises", {categoryId: $(e.currentTarget).val()});
    }
    else{
      Router.go("adminExercises");
    }
  }

});