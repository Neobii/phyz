Template.Exercises.events({
  "change [name='selectSearchCategory']" : function(e, t){
    e.preventDefault();
    if($(e.currentTarget).val() !== "all"){
      Router.go("exercises", {categoryId: $(e.currentTarget).val()});
    }
    else{
      Router.go("exercises");
    }
  }
});