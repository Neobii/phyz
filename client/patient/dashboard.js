Template.Dashboard.events({
 'click [data-action="savePatient"]': function(e, tmpl){
    e.preventDefault();
    var userId = Meteor.userId();
    var name = $("[name='editName']").val();
    var email = $("[name='editEmail']").val();
    var phone = $("[name='editPhone']").val();
    var newPassword = $("[name='editPassword']").val();
    Meteor.call("patientUpdateSelf", userId, name, email, phone);
    Meteor.call("patientSetSelfPassword", userId, newPassword); // WHY IS THIS METHOD 4 PHYSICIAN?
    console.log("Your information; " + " " + "name:" + " " + name + "; " + "email:" + " " + email + "; " + "phone: " + phone);
    $("[name='editName']").val('');
    $("[name='editEmail']").val('');
    $("[name='editPassword']").val('');
    $("[name='editPhone']").val('');
    Session.set("patientEditPatient", false);
  },
  "click [data-action='edit-patient']" : function(e, t){
    e.preventDefault();
    console.log("my id is: " + Meteor.userId());
    Session.set("patientEditPatient", true);
  },
  "click [data-action='subscribe']" : function(e, t){
    e.preventDefault();
    var userId = Meteor.userId();
    var subscribed = true;
    Meteor.call("patientSubscribed", userId, subscribed);
  },
  "click [data-action='unSubscribe']" : function(e, t){
    e.preventDefault();
    var userId = Meteor.userId();
    var subscribed = false;
    Meteor.call("patientSubscribed", userId, subscribed);
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("patientEditPatient", false);
  }
});

Template.Dashboard.activeVideo = function(){
    if(!this.vimeo){
        if(!this.vimeoId){
            return false;
        }
        this.vimeo = new Vimeo([
            this.vimeoId
        ]);
    }
    return this.vimeo.getVideos()[0];
}