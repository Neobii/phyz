Template.adminLayout.helpers({
  userPhysician: function () {
    if(Meteor.user.profile.isPhysician.true)
		return true;
	else
		return false;
  }
});
var myVideo = new Vimeo([
  	"98575657"
]);

Template.adminHome.activeVideo = function(){
	return myVideo.getVideos()[0];	
}


/*
"98503027",
+	  "98234824"
*/

Template.adminHome.events({
 'click [data-action="saveAdmin"]': function(e, tmpl){
    e.preventDefault();
    var userId = Meteor.userId();
    var name = $("[name='editName']").val();
    var email = $("[name='editEmail']").val();
    var phone = $("[name='editPhone']").val();
    Meteor.call("adminUpdateSelf", userId, name, email, phone);
    console.log("Your information; " + " " + "name:" + " " + name + "; " + "email:" + " " + email + "; " + "phone: " + phone);
    $("[name='editName']").val('');
    $("[name='editEmail']").val('');
    $("[name='editPhone']").val('');
    Session.set("adminEditingSelf", false);
  },
  "click [data-action='edit-admin']" : function(e, t){
    e.preventDefault();
    console.log("my id is: " + Meteor.userId());
    Session.set("adminEditingSelf", true);
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("adminEditingSelf", false);
  },
  "click [data-action='adminResetPassword']" : function(e,t){
    e.preventDefault;
    Session.set("adminResetingPassword", true)
  },
  "click [data-action='cancelNewPass']" : function(e,t){
    e.preventDefault();
    Session.set("adminResetingPassword", false)
  },
  "click [data-action='saveNewPass']" : function(e,t){
    e.preventDefault();
    var userId = Meteor.userId();
    var newPassword = $("[name='editPassword']").val();
    Meteor.call("adminSetSelfPassword", userId, newPassword);
    $("[name='editPassword']").val('');
    Session.set("adminResetingPassword", false)
  }
});