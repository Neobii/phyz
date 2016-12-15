Template.addPracticePhysician.events({
 'click [data-action="submitNewPhys"]': function(e, tmpl){
    e.preventDefault();
    var username = $("[name='physicianName']").val();
    var email = $("[name='physicianEmail']").val();
    var password = $("[name='physicianPass']").val();
    var notes = $("[name='physicianNotes']").val();
    Meteor.call("practicePhysicianAddUser", username, email, password, notes, function(e, r){
    	console.log(r);
    	console.log(e);
    });
    console.log("Add physician" + " " + "name:" + " " + username + "," + " " + "email:" + " " + email + "," + " " + notes);
  }
});


// How will we quary physicians from Meteor.Users collection?
	// like this: Meteor.users.find({"profile.adminId": Meteor.userId()})


Template.editPracticePhysician.events({
  "click [data-action='editPhysician']" : function(e, t){
    e.preventDefault();
    Session.set("editingPhysician", $(t.find("[name='selectPhysician']")).val());
  },
	"click [data-action='cancelButton']" : function(e){
		e.preventDefault();
    Session.set("editingPhysician", false);
  },
  "click [data-action='submitEditPhys']" : function(e, t){
    e.preventDefault();
    //console.log({_id: $(t.find("[name='helpFormLinks']")).val()});
			Meteor.users.update({_id: Session.get("editingPhysician")},
						{$set: {
				    	    username: $(t.find("[name='editPhysicianName']")).val(),
						   	// 	email: $(t.find("[name='editPhysicianEmail']")).val(),
						    // 	password: $(t.find("[name='editPhysicianPass']")).val()

	}})
		 Session.set("editingPhysician", undefined);
	}
});

Template.removePracticePhysician.events({
  "click [data-action='removePhysBut']" : function(e, t){
    e.preventDefault();
    console.log({_id: $(t.find("[name='selectPhysician']")).val()});
    Meteor.users.remove({_id: $(t.find("[name='selectPhysician']")).val()});
  }
});

Template.editPracticePhysician.physician = function(){
	return Meteor.users.findOne({_id: Session.get("editingPhysician")});
} 

Template.editPracticePhysician.physicians = function(){
	return Meteor.users.find({"profile.practiceId": Meteor.userId()});
}

Template.removePracticePhysician.physicians = function(){
  return Meteor.users.find({"profile.practiceId": Meteor.userId()});
}

Template.viewAllPracticePhysicians.physicians = function(){
  return Meteor.users.find({"profile.practiceId": Meteor.userId()});
}