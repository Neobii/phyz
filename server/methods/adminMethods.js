Meteor.methods({
  adminUpdateSelf: function(userId, name, email, phone) {
    check(userId, String);
    check(name, String);
    check(email, String);
    check(phone, String);
    return Meteor.users.update({_id: userId}, {$set: {
            "emails": [{address: email}],
            "profile.phone": phone,
            "profile.name": name
        }
    });
  },
  adminSetSelfPassword: function(userId, newPassword) {
    check(userId, String);
    check(newPassword, String);
    return Accounts.setPassword(userId, newPassword)
  },
  adminAddUser: function(username, password) {
    check(username, String);
    check(password, String);
    return Accounts.createUser({
          username: username,
          password: password,
          profile: {isAdmin: true}
    });
  }, 
	adminAddPhysician: function(name, email, password, isAdmin) {
    check(name, String);
    check(email, String);
    check(password, String);
    check(isAdmin, Boolean);
    if(!Meteor.users.findOne({_id: this.userId}).profile.type==="admin"){
      return false;
    }
    return Accounts.createUser({
          email: email,
          password: password,
      //    password: password,
          profile: {
            name: name,
            type: 'physician',
            isAdmin: isAdmin,
            adminId: this.userId
          }

    });
  },
  adminRemovePhysician: function(physicianId) {
    check(physicianId, String);
    SyllabusExercises.remove({physicianId: physicianId})
    var patientIds = _.pluck("_id", Meteor.users.find({"profile.physicianId": physicianId}).fetch());
    Meteor.users.remove({"profile.physicianId": physicianId});
    PatientsExercises.remove({patientId : {$in: patientIds}});
    Meteor.users.remove({_id: physicianId});
  },
  adminUpdatePhysician: function(physicianId, email, phone, name, isAdmin) {
    check(physicianId, String);
    check(email, String);
    check(name, String);
    check(phone, String);
    check(isAdmin, Boolean);
    return Meteor.users.update({_id: physicianId}, {$set: {
            "emails": [{address: email}],
            "profile.phone": phone,
            "profile.name": name,
            "profile.isAdmin": isAdmin
        }
    });
  },
  adminPhysSetPassword: function(physicianId, newPassword) {
    check(physicianId, String);
    check(newPassword, String);
    return Accounts.setPassword(physicianId, newPassword)
  },
  incrementSyllabusExercises: function(syllabusId, indexNum) {
    check(syllabusId, String);
    check(indexNum, Number);
    //console.log(SyllabusExercises.find({syllabusId: syllabusId, index: {$gte: indexNum}}).fetch())
    SyllabusExercises.update({syllabusId: syllabusId, index: {$gte: +indexNum}}, {$inc: {index: 1}}, {multi: true});
  },
  updateExerciseCount: function(syllabusId) {
    check(syllabusId, String);
    var exerciseCount = SyllabusExercises.find({syllabusId: syllabusId}).count();
    Syllabi.update({_id: syllabusId}, {$set: {exerciseCount: exerciseCount}});
  },
  moveExerciseUp: function(syllabusId, indexNum){
    check(syllabusId, String);
    check(indexNum, String);
    var firstId = SyllabusExercises.findOne({syllabusId: syllabusId, index: +indexNum - 1})._id;
    var secondId = SyllabusExercises.findOne({syllabusId: syllabusId, index: +indexNum})._id;
    SyllabusExercises.update({_id: firstId}, {$inc: {index: 1}});
    SyllabusExercises.update({_id: secondId}, {$inc: {index: -1}});
  },
  moveExerciseDown: function(syllabusId, indexNum){
    check(syllabusId, String);
    check(indexNum, String);
    var firstId = SyllabusExercises.findOne({syllabusId: syllabusId, index: +indexNum + 1})._id;
    var secondId = SyllabusExercises.findOne({syllabusId: syllabusId, index: +indexNum})._id;
    SyllabusExercises.update({_id: firstId}, {$inc: {index: -1}});
    SyllabusExercises.update({_id: secondId}, {$inc: {index: 1}});
  },
  deleteExercise: function(syllabusId, indexNum){
    check(syllabusId, String);
    check(indexNum, String);
    SyllabusExercises.update({syllabusId: syllabusId, index: {$gte: +indexNum}}, {$inc: {index: -1}}, {multi: true});
    Syllabi.update({_id: syllabusId}, {$inc: {exerciseCount: -1}});
  }
  /*
  addSyllabi: function(name, email, category, users, password, notes) {
    // what's the command here? Should I avoid the method and just do a regular .insert in the manager?
    return Accounts.createUser({
          username: username,
          email: email,
          password: password,
          notes: notes,
          profile: {type: 'practice', adminId: this.userId}
    });
  }  */
});