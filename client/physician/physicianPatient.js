Template.physicianPatient.events({
  "click [data-action='delete-patient']" : function(e, t){
    e.preventDefault();
    var findPatientName = $(e.currentTarget).attr("data-target-id");
    var patientName = Meteor.users.findOne({_id: findPatientName});
    var result = confirm("Are you sure you want to delete " + patientName.profile.name + "?");
      if (result==true) {
          Meteor.users.remove({_id: $(e.currentTarget).attr("data-target-id")});
          Router.go('physicianPatients');
          console.log("removed: ", $(e.currentTarget).attr("data-target-id"));
      }
  },
  "click [data-action='edit-patient']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Session.set("physicianEditPatient", true)
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("physicianEditPatient", false)
  },  
  "click [data-action='savePatient']" : function(e, t){
    e.preventDefault();
    var patientId = this._id;
    var name = $("[name='editName']").val();
    var email = $("[name='editEmail']").val();
    var phone = $("[name='editPhone']").val();
    Meteor.call("physicianUpdatePatient", patientId, email, phone, name);
     Session.set("physicianEditPatient", false); // switching page content
    // Session.set("adminEditingPhysician", false); // from the router
  },
  "click [data-action='exerciseDaily']" : function(e, t){
    e.preventDefault();
    var patientId =  Router.current().params._id;
    var testValue =  Meteor.users.findOne({_id: patientId}).profile.notifications.dailyExercise && Meteor.users.findOne({_id: patientId}).profile.notifications.dailyExercise;
    Meteor.users.update({_id: patientId}, {$set: {"profile.notifications.dailyExercise": !testValue}});
       // console.log(!testValue); //I left this here if you want to test if button is working.
  },
  "click [data-action='exerciseComplete']" : function(e, t){
    e.preventDefault();
    var patientId =  Router.current().params._id;
    var testValue =  Meteor.users.findOne({_id: patientId}).profile.notifications.completedExercise && Meteor.users.findOne({_id: patientId}).profile.notifications.completedExercise;
    Meteor.users.update({_id: patientId}, {$set: {"profile.notifications.completedExercise": !testValue}});
  },
  "click [data-action='courseComplete']" : function(e, t){
    e.preventDefault();

    var patientId = Router.current().params._id;
    var testValue =  Meteor.users.findOne({_id: patientId}).profile.notifications.completedCourse && Meteor.users.findOne({_id: patientId}).profile.notifications.completedCourse;
    Meteor.users.update({_id: patientId}, {$set: {"profile.notifications.completedCourse": !testValue}});

  },
  "click [data-action='physChangePatientPassword']" : function(e,t){
    e.preventDefault;
    Session.set("physChangingPatientPassword", true)
  },
  "click [data-action='cancelNewPass']" : function(e,t){
    e.preventDefault();
    Session.set("physChangingPatientPassword", false)
  },
  "click [data-action='saveNewPass']" : function(e,t){
    e.preventDefault();
    var patientId = Router.current().params._id;
    var newPassword = $("[name='editPassword']").val();
    Meteor.call("physSetPatPassword", patientId, newPassword);
    $("[name='editPassword']").val('');
    Session.set("physChangingPatientPassword", false)
  }
});

Template.physicianPatientComp.events({
  "click [data-action='physicianDeleteExercise']" : function(e, t){
    e.preventDefault();
    Meteor.call("deletePatientExercise", Router.current().params._id, $(e.currentTarget).attr("data-index"));
    PatientsExercises.remove({_id: $(e.currentTarget).attr("data-target-id")});
  },
  "click [data-action='physicianMoveUp']" : function(e, t){
    e.preventDefault();
    Meteor.call("movePatientExerciseUp", Router.current().params._id, $(e.currentTarget).attr("data-index"));
  },
  "click [data-action='physicianMoveDown']" : function(e, t){
    e.preventDefault();
    Meteor.call("movePatientExerciseDown", Router.current().params._id, $(e.currentTarget).attr("data-index"));
  },
  "click [data-action='physicianSetCurrent']" : function(e, t){
    e.preventDefault();
    var index = +$(e.currentTarget).attr("data-index");
    var id = $(e.currentTarget).attr("data-target-id");
    PatientsExercises.update({_id: id}, {$set: {status: "incomplete"}});
    Meteor.users.update({_id: Router.current().params._id}, {$set: {"profile.exerciseIndex": index}});
  },
  "click [data-action='toggleComplete']" : function(e, t){
    e.preventDefault();
    var id = $(e.currentTarget).attr("data-target-id");
    var status = PatientsExercises.findOne({_id: id}).status;
    status = (status === "complete")? "incomplete": "complete";
    PatientsExercises.update({_id: id}, {$set: {status: status}})
  }
});

Template.physicianAddExercise.events({
  "click [data-action='addSyllabusExercise']" : function(e, t){
    e.preventDefault();
    Meteor.call("incrementPatientExercises", Router.current().params._id, +$(e.currentTarget).attr("data-index"))
    PatientsExercises.insert({
      patientId: Router.current().params._id, 
      exerciseId: $(t.find("[name='selectAddExercise']")).val(),
      index: +$(e.currentTarget).attr("data-index")
    });
    Meteor.users.update({_id: Router.current().params._id}, {$inc: {"profile.exerciseCount": 1}});
  }
});