Meteor.publish("physicianPatients", function(){
  return Meteor.users.find({'profile.physicianId': this.userId, 'profile.type': "patient"});
});
Meteor.publish("physicianPhysicians", function(){
  return Meteor.users.find({"profile.type": 'physician', 'profile.physicianId': this.userId});
});
Meteor.publish("patientsExercises", function(){
	return PatientsExercises.find({});
});