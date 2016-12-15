

//if user isn't logged in toss them back to home
Router.onBeforeAction( function(){
  if(!Meteor.loggingIn() && !Meteor.user()){
    Router.go("home");
  }
}, {except: ["home"]});


//home page redirection if already logged in
Router.onBeforeAction( function(){
  if(!Meteor.loggingIn() && Meteor.user()){
    if(Meteor.user().profile.type === "admin"){
      Router.go("/admin");
    }
    if(Meteor.user().profile.type === "physician"){
      Router.go("/physician");
    }
    if(Meteor.user().profile.type === "patient"){
      Router.go("/dashboard");// patient routes will be simple
    }
  }
}, {only: ["home"]});
/*
//admin restrict routes

Router.onBeforeAction( function(){
  if(!Meteor.loggingIn() && Meteor.user()){
    if(Meteor.user().profile.type !== "admin"){
      Router.go("home");
    }
  }
}, {only: ["adminExercises", "adminExercise", "adminSyllabi"]});

//physician restrict routes

Router.onBeforeAction( function(){
  if(!Meteor.loggingIn() && Meteor.user()){
    if(Meteor.user().profile.type !== "physician"){
      Router.go("home");
    }
  }
}, {only: ["physicianExercises", "physicianExercise"]});

//patient restrict routes

Router.onBeforeAction( function(){
  if(!Meteor.loggingIn() && Meteor.user()){
    if(Meteor.user().profile.type !== "patient"){
      Router.go("home");
    }
  }
}, {only: ["dashboard", "exercises", "exercise"]});

*/