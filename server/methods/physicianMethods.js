Meteor.methods({
  physicianUpdateSelf: function(userId, name, email, phone) {
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
  physicianSetSelfPassword: function(userId, newPassword) {
    check(userId, String);
    check(newPassword, String);
    return Accounts.setPassword(userId, newPassword)
  },
  physicianAssignSyllabus: function(patientId, syllabusId) {
    check(patientId, String);
    check(syllabusId, String);
    PatientsExercises.remove({patientId: patientId});
    Meteor.users.update({_id: patientId}, {$set: {"profile.exerciseCount": 0, "profile.exerciseIndex": 0}});
    var syllabus = Syllabi.findOne({_id: syllabusId});
    _.each(syllabus.exercises().fetch(), function(exercise){
      Meteor.call("insertExerciseToEnd", patientId, exercise.exerciseId);
    })
  },
  physicianMakeFromTemplate: function(syllabusId, parentSyllabusId) {
    check(syllabusId, String);
    check(parentSyllabusId, String);
      SyllabusExercises.remove({syllabusId: syllabusId});
      var syllabus = Syllabi.findOne({_id: parentSyllabusId});
    _.each(syllabus.exercises().fetch(), function(exercise){
        SyllabusExercises.insert({
          exerciseId: exercise.exerciseId, 
          syllabusId: syllabusId, 
          index: exercise.index,
        })
       Syllabi.update({_id: syllabusId}, {$set: {"exerciseCount": SyllabusExercises.find({syllabusId: syllabusId}).count()}})      
    })

  },  
  // send e-mail on exercise completion
  // send e-mail on course completion
	physicianAddPatient: function(name, email, password) {
    check(name, String);
    check(email, String);
    check(password, String);
    return Accounts.createUser({
          email: email,
          password: password,
          profile: {
          	name: name,
          	type: 'patient', 
          	physicianId: this.userId,
            exerciseIndex: 0,
            exerciseCount: 0
          }
    })
  },
  physicianUpdatePatient: function(patientId, email, phone, name) {
    check(patientId, String);
    check(email, String);
    check(phone, String);
    check(name, String);
    return Meteor.users.update({_id: patientId}, {$set: {
            "emails": [{address: email}],
            "profile.phone": phone,
            "profile.name": name
        }
    });
  },
  physSetPatPassword: function(patientId, newPassword) {
    check(patientId, String);
    check(newPassword, String);
    return Accounts.setPassword(patientId, newPassword)
  },
  physicianAddPhysician: function(name, email, password) {
    check(name, String);
    check(email, String);
    check(password, String);
    return Accounts.createUser({
          email: email,
          password: password,
          profile: {
            name: name,
            type: 'physician',
            physicianId: this.userId
          }
    });
  },
  physicianUpdatePhysician: function(physicianId, email, phone, name) {
    check(physicianId, String);
    check(email, String);
    check(phone, String);
    check(name, String);
    return Meteor.users.update({_id: physicianId}, {$set: {
            "emails": [{address: email}],
            "profile.phone": phone,
            "profile.name": name
        }
    });
  },
  physicianUpdateSelf: function(userId, name, email, phone) {
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
  physicianRemovePhysician: function(physicianId) {
    check(physicianId, String);
    SyllabusExercises.remove({physicianId: physicianId})
    var patientIds = _.pluck("_id", Meteor.users.find({"profile.physicianId": physicianId}).fetch());
    Meteor.users.remove({"profile.physicianId": physicianId});
    PatientsExercises.remove({patientId : {$in: patientIds}});
    Meteor.users.remove({_id: physicianId});
  },
  physicianSetSelfPassword: function(userId, newPassword) {
    check(userId, String);
    check(newPassword, String);
    return Accounts.setPassword(userId, newPassword)
  },
  physicianPhysSetPassword: function(physicianId, newPassword) {
    check(physicianId, String);
    check(newPassword, String);
    return Accounts.setPassword(physicianId, newPassword)
  },
  // this method should set [index:0] i believe, which it appears not to. .
  insertExerciseToCurrent: function(patientId, exerciseId){
    check(patientId, String);
    check(exerciseId, String);
    var ei = Meteor.users.findOne({_id: patientId}).profile.exerciseIndex;
    Meteor.call("incrementPatientExercises", patientId, ei);
    PatientsExercises.insert({
      patientId: patientId,
      exerciseId: exerciseId,
      index: ei
    });
    Meteor.users.update({_id: patientId}, {$inc: {"profile.exerciseCount": 1}});
  },
  insertExerciseToEnd: function(patientId, exerciseId){
    check(patientId, String);
    check(exerciseId, String);
    PatientsExercises.insert({
      patientId: patientId,
      exerciseId: exerciseId,
      index: Meteor.users.findOne({_id: patientId}).profile.exerciseCount
    });
    Meteor.users.update({_id: patientId}, {$inc: {"profile.exerciseCount": 1}});
    //updateExerciseCount(patientId);
  },
  incrementPatientExercises: function(patientId, indexNum) {
    check(patientId, String);
    check(indexNum, Number);
    //console.log(SyllabusExercises.find({syllabusId: syllabusId, index: {$gte: indexNum}}).fetch())
    PatientsExercises.update({patientId: patientId, index: {$gte: +indexNum}}, {$inc: {index: 1}}, {multi: true});
  },
  movePatientExerciseUp: function(patientId, indexNum){
    check(patientId, String);
    check(indexNum, Number);
    var firstId = PatientsExercises.findOne({patientId: patientId, index: +indexNum - 1})._id;
    var secondId = PatientsExercises.findOne({patientId: patientId, index: +indexNum})._id;
    PatientsExercises.update({_id: firstId}, {$inc: {index: 1}});
    PatientsExercises.update({_id: secondId}, {$inc: {index: -1}});
  },
  movePatientExerciseDown: function(patientId, indexNum){
    check(patientId, String);
    check(indexNum, Number);
    var firstId = PatientsExercises.findOne({patientId: patientId, index: +indexNum + 1})._id;
    var secondId = PatientsExercises.findOne({patientId: patientId, index: +indexNum})._id;
    PatientsExercises.update({_id: firstId}, {$inc: {index: -1}});
    PatientsExercises.update({_id: secondId}, {$inc: {index: 1}});
  },
  deletePatientExercise: function(patientId, indexNum){
    check(patientId, String);
    check(indexNum, Number);
    PatientsExercises.update({patientId: patientId, index: {$gte: +indexNum}}, {$inc: {index: -1}}, {multi: true});
    Meteor.users.update({_id: patientId}, {$inc: {"profile.exerciseCount": -1}});
  }
});