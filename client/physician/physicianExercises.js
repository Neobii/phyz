Template.physicianExercises.events({
  "change [name='physSelectSearchCategory']" : function(e, t){
    e.preventDefault();
    if($(e.currentTarget).val() !== "all"){
      Router.go("physicianExercises", {categoryId: $(e.currentTarget).val()});
    }
    else{
      Router.go("physicianExercises");
    }
  }
})