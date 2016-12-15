Template.PhysicianHome.events({
 'click [data-action="savePhysician"]': function(e, tmpl){
    e.preventDefault();
    var userId = Meteor.userId();
    var name = $("[name='editName']").val();
    var email = $("[name='editEmail']").val();
    var phone = $("[name='editPhone']").val();
    Meteor.call("physicianUpdateSelf", userId, name, email, phone);
    console.log("Your information; " + " " + "name:" + " " + name + "; " + "email:" + " " + email + "; " + "phone: " + phone);
    $("[name='editName']").val('');
    $("[name='editEmail']").val('');
    $("[name='editPhone']").val('');
    Session.set("physicianEditingSelf", false);
  },
  "click [data-action='edit-physician']" : function(e, t){
    e.preventDefault();
    console.log("my id is: " + Meteor.userId());
    Session.set("physicianEditingSelf", true);
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("physicianEditingSelf", false);
  },
  "click [data-action='physcianChangePassword']" : function(e,t){
    e.preventDefault;
    Session.set("physicianChangingPassword", true)
  },
  "click [data-action='cancelNewPass']" : function(e,t){
    e.preventDefault();
    Session.set("physicianChangingPassword", false)
  },
  "click [data-action='saveNewPass']" : function(e,t){
    e.preventDefault();
    var userId = Meteor.userId();
    var newPassword = $("[name='editPassword']").val();
    Meteor.call("physicianSetSelfPassword", userId, newPassword);
    $("[name='editPassword']").val('');
    Session.set("physicianChangingPassword", false)
  }
});