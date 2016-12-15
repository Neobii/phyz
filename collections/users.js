Meteor.users._transform = function (doc) {
  return new ModelUser(doc);
};

ModelUser = function(doc) {
  _.extend(this, doc);
}
/*
ModelUser.prototype.physician = function() {
		return Physician.find({userId: this._id})
};*/
/*ModelUser.prototype.users = function() {
		return Meteor.users.find({userId: this._id})
};*/

//physician transforms
ModelUser.prototype.patients = function(){
	return Meteor.users.find({"profile.physicianId": this._id});
}

//patient transforms
ModelUser.prototype.currentExercise = function(){
  return PatientsExercises.findOne({patientId: this._id, index: this.profile.exerciseIndex})
};
ModelUser.prototype.getExerciseAt = function(index){
	return PatientsExercises.findOne({patientId: this._id, index: index});
}
ModelUser.prototype.lastExerciseIndex = function(){
	return this.profile.exerciseCount - 1;
};
ModelUser.prototype.assignedExercises = function() {
  return PatientsExercises.find({patientId: this._id}, {sort: {index: 1}});
};
ModelUser.prototype.completedExercises = function() {
	return PatientsExercises.find({userId: this._id})
};
ModelUser.prototype.patientPhysician = function() {
	return Meteor.users.findOne({_id: this.profile.physicianId});
};
ModelUser.prototype.hasCompletedSyllabus = function() {
  var completedDate = Meteor.users.findOne({_id: this._id}).profile.completedSyllabus || "";
  return App.prettifyDate(completedDate);
};