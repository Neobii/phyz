Template.physicianPhysicians.events({
  "click [data-action='delete-physician']" : function(e, t){
    e.preventDefault();
    console.log("removed: ", $(e.currentTarget).attr("data-target-id"));
    var physicianId = $(e.currentTarget).attr("data-target-id");
    Meteor.call("physicianRemovePhysician", physicianId);
  },
  "click [data-action='edit-physician']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Router.go('physicianPhysician', {_id: $(e.currentTarget).attr("data-target-id")});
    Session.set("physicianEditPhysician", true);
  },
 'click [data-action="submitNewPhys"]': function(e, tmpl){
    e.preventDefault();
    var name = $("[name='physicianName']").val();
    var email = $("[name='physicianEmail']").val();
    var password = $("[name='physicianPass']").val();
    Meteor.call("physicianAddPhysician", name, email, password);
    console.log("Add physician" + " " + "name:" + " " + name + "," + " " + "phone:" + " " +  + "," + " " + "email:" + " " + email);
    $("[name='physicianName']").val('');
    $("[name='physicianEmail']").val('');
    $("[name='physicianPass']").val('');
  }  
});