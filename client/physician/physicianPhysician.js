Template.physicianPhysician.events({
  "click [data-action='delete-physician']" : function(e, t){
    e.preventDefault();
    console.log("removed: ", $(e.currentTarget).attr("data-target-id"));
    var physicianId = $(e.currentTarget).attr("data-target-id");
    Meteor.call("physicianRemovePhysician", physicianId);
  },
  "click [data-action='edit-physician']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Session.set("physicianEditPhysician", true)
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("physicianEditPhysician", false)
  },  
  "click [data-action='savePhysician']" : function(e, t){
    e.preventDefault();
    var physicianId = Router.current().params._id;
    var name = $("[name='editName']").val();
    var email = $("[name='editEmail']").val();
    var phone = $("[name='editPhone']").val();
    Meteor.call("physicianUpdatePhysician", physicianId, email, phone, name);
     Session.set("physicianEditPhysician", false);
  },
  "click [data-action='physChangePhysPassword']" : function(e,t){
    e.preventDefault;
    Session.set("physChangingPhysPassword", true)
  },
  "click [data-action='cancelNewPass']" : function(e,t){
    e.preventDefault();
    Session.set("physChangingPhysPassword", false)
  },
  "click [data-action='saveNewPass']" : function(e,t){
    e.preventDefault();
    var physicianId = Router.current().params._id;
    var newPassword = $("[name='editPassword']").val();
    Meteor.call("physicianPhysSetPassword", physicianId, newPassword);
    $("[name='editPassword']").val('');
    Session.set("physChangingPhysPassword", false)
  }

});