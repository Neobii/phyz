Template.adminPhysicians.events({
  "click [data-action='delete-physician']" : function(e, t){
    e.preventDefault();
    var physicianId = $(e.currentTarget).attr("data-target-id");
    console.log($(e.currentTarget).attr("data-target-id"));
    Meteor.call("adminRemovePhysician", physicianId);
  },
  "click [data-action='edit-physician']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Router.go('adminPhysician', {_id: $(e.currentTarget).attr("data-target-id")});
    Session.set("adminEditPhysician", true);
  },
 'click [data-action="submitNewPhys"]': function(e, tmpl){
    e.preventDefault();
    var name = $("[name='physicianName']").val();
    var email = $("[name='physicianEmail']").val();
    var password = $("[name='physicianPass']").val();
    var isAdmin = $(tmpl.find("[name='isAdmin']")).prop('checked');
    Meteor.call("adminAddPhysician", name, email, password, isAdmin);
    console.log("Add physician" + " " + "name:" + " " + name + "," + " " + "phone:" + " " +  + "," + " " + "email:" + " " + email + ", " + "isAdmin: " + isAdmin);
    $("[name='physicianEmail']").val('');
    $("[name='physicianName']").val('');
    $("[name='physicianPass']").val('');
    $("[name='isAdmin']").removeAttr('checked');
  }  
});

Template.adminPhysicians.physicians = function(){
  return Meteor.users.find({"profile.type": 'physician', "profile.adminId": Meteor.userId()})}
