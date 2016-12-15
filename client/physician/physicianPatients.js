Template.physicianPatients.events({
 'click [data-action="submitNewPatient"]': function(e, tmpl){
    e.preventDefault();
    var name = $("[name='patientName']").val();
    var email = $("[name='patientEmail']").val();
    var password = $("[name='patientPass']").val();
    Meteor.call("physicianAddPatient", name, email, password);
    console.log("Add patient" + " " + "name:" + " " + name + "," + " " + "email:" + " " + email);
    $("[name='patientName']").val('');
    $("[name='patientEmail']").val('');
    $("[name='patientPass']").val('');
  },
  "click [data-action='delete-patient']" : function(e, t){
    e.preventDefault();
    var findPatientName = $(e.currentTarget).attr("data-target-id");
    var patientName = Meteor.users.findOne({_id: findPatientName});
    var result = confirm("Are you sure you want to delete " + patientName.profile.name + "?");
      if (result==true) {
          Meteor.users.remove({_id: $(e.currentTarget).attr("data-target-id")});
      }
    console.log("removed: ", $(e.currentTarget).attr("data-target-id"));
  },
  "click [data-action='edit-patient']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Router.go('physicianPatient', {_id: $(e.currentTarget).attr("data-target-id")});
    Session.set("physicianEditPatient", true);
  },  
});