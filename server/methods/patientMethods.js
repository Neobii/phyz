var options = {
    apiKey: 'key-bcb3f4f43ed9d38a89de88a0a126ce7b',
    domain: 'sandboxb7dbf8989843430eb8d30909a9bf71ce.mailgun.org'
}

Meteor.methods({
	rateExercise : function(exerciseId, rating){
    check(exerciseId, String);
    check(rating, Number);
		ExerciseMetrics.upsert({exerciseId: exerciseId, patientId: this.userId}, {$set: {rating: rating}});
    var insertString = "totalRating." + rating;
    var insertObj = {};
    insertObj[insertString] = 1;
    Exercises.update({_id: exerciseId}, {$inc: insertObj})
	},
  patientUpdateSelf: function(userId, name, email, phone) {
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
  patientSetSelfPassword: function(userId, newPassword) {
    check(userId, String);
    check(newPassword, String);
    return Accounts.setPassword(userId, newPassword)
  },
  patientSubscribed: function(userId, subscribed) {
    check(userId, String);
    check(subscribed, Boolean);
    return Meteor.users.update({_id: userId}, {$set: {
        "profile.subscribed": subscribed
      }
    });
  },
  findNextCurrentExercise: function(){
    
  },
  //patientId, email, exercise, time
  completeExerciseEmail: function(patientId, exerciseId, time){
    check(patientId, String);
    check(exerciseId, String);
    check(time, String);
    var patient = Meteor.users.findOne({_id: patientId});
    var sendExerciseComplete = new Mailgun(options);
    var exerciseName = Exercises.findOne({_id: exerciseId}).name;
    //var physician = Meteor.users.findOne({_id: this.profile.physicianId});
    //var physicianEmail = physician.profile.emails[0].address;
    console.log("sending" + " " + sendExerciseComplete);
    sendExerciseComplete.send({
     'to': patient.patientPhysician().emails[0].address,
     'from': 'test@sandboxb7dbf8989843430eb8d30909a9bf71ce.mailgun.org',
     'html': '<html><head></head><body><h3>Your patient completed an exercise!</h3><br /><p>' + 'Hey ' + patient.patientPhysician().profile.name + ',' + ' your patient ' + patient.profile.name + ' completed ' + '"' + exerciseName + '", ' + time + '.' + '<br /><br />' + 'Thanks for using Physmodo!' + '</p></body></html>',
    // 'text': 'This is a test',
     'subject': 'Exercise status has changed',
     'tags': [
         'exercise',
         'complete',
         'physmodo'
      ]
    });
  }
});

