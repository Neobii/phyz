Template.adminPhysician.events({
  "click [data-action='delete-physician']" : function(e, t){
    e.preventDefault();
    var physicianId = $(e.currentTarget).attr("data-target-id");
    Meteor.call("adminRemovePhysician", physicianId);
  },
  "click [data-action='edit-physician']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Session.set("adminEditPhysician", true)
  },
  "click [data-action='cancelButton']" : function(e, t){
    e.preventDefault();
    Session.set("adminEditPhysician", false)
  },  
  "click [data-action='savePhysician']" : function(e, t){
    e.preventDefault();
    var physicianId = this._id;
    var name = $("[name='editName']").val();
    var email = $("[name='editEmail']").val();
    var phone = $("[name='editPhone']").val();
    var isAdmin = $(t.find("[name='editIsAdmin']")).prop('checked');
    Meteor.call("adminUpdatePhysician", physicianId, email, phone, name, isAdmin);
     Session.set("adminEditPhysician", false); // switching page content
    // Session.set("adminEditingPhysician", false); // from the router
  },
  "click [data-action='adminChangePhysPassword']" : function(e,t){
    e.preventDefault;
    Session.set("adminChangingPhysPassword", true)
  },
  "click [data-action='cancelNewPass']" : function(e,t){
    e.preventDefault();
    Session.set("adminChangingPhysPassword", false)
  },
  "click [data-action='saveNewPass']" : function(e,t){
    e.preventDefault();
    var physicianId = this._id;
    var newPassword = $("[name='editPassword']").val();
    Meteor.call("adminPhysSetPassword", physicianId, newPassword);
    $("[name='editPassword']").val('');
    Session.set("adminChangingPhysPassword", false)
  }

});