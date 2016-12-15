Router.map(function (){
  this.route('home', {
  	layoutTemplate: "homePageLayout",
    path: '/'
  });
  this.route('dashboard', {
    layoutTemplate: "endUserLayout",
    path: '/dashboard',
    waitOn: function(){
      return [
        Meteor.subscribe('allSyllabusExercises'),
        Meteor.subscribe('allExercises', this.params._id),
        Meteor.subscribe('allSyllabus', this.params._id),
        Meteor.subscribe('patientsExercises'),
        Meteor.subscribe("allSyllabus"),
        Meteor.subscribe('onePatientPhysician'),
        Meteor.subscribe("exerciseMetrics")
      ]
    },
    data: function(){
      var self = this;
      return {
        exercises: function(){
          return (Meteor.user())? Meteor.user().assignedExercises() : [];
        }
      }
    },
    onStop: function () {
      Session.set('patientEditPatient', false);
    }
  });
this.route('patientPhysician', {
    layoutTemplate: "endUserLayout",
    path: '/patient/physician',
    waitOn: function(){
      return [
        Meteor.subscribe("allSyllabus"),
        Meteor.subscribe('onePatientPhysician'),
        Meteor.subscribe("exerciseMetrics")
      ]
    }/*,
    data: function(){
    //var self = this;
      var physicianId = Meteor.users.findOne({_id: this.userId}).profile.physicianId
      return {
        physician: function(){
          return Meteor.users.find({_id: physicianId});
        }
      }
    } */
  });
  this.route('currentExercise', {
    layoutTemplate: "endUserLayout",
    path: '/current-exercise',
    waitOn: function(){
      return [
        Meteor.subscribe('allExercises'),
        Meteor.subscribe('patientsExercises'),
        Meteor.subscribe("exerciseMetrics"),
        Meteor.subscribe('onePatientPhysician'),
        Meteor.subscribe('oneUser')
      ]
    },
    data: function(){
      var self = this;
      return {
        nextIndex: function(){
          return Meteor.user().profile.exerciseIndex+1;
        },
        previousIndex: function(){
          return Meteor.user().profile.exerciseIndex-1;
        }
      }
    },
    onStop: function () {
      Session.set('changingRating', false);
    }
  });
  // do we still need this route?
  this.route('assignedExercise', {
    layoutTemplate: "endUserLayout",
    path: '/assigned-exercise/:exerciseIndex',
    waitOn: function(){
      return [
        Meteor.subscribe('patientsExercises'),
        Meteor.subscribe('allExercises'),
        Meteor.subscribe("exerciseMetrics")
      ]
    },
    data: function(){
      var self = this;
      return {
        assignedExercise: function(){
          return Meteor.user().getExerciseAt(+self.params.exerciseIndex);
        },
        nextIndex: function(){
          return +self.params.exerciseIndex+1;
        },
        previousIndex: function(){
          return +self.params.exerciseIndex-1;
        }
      }
    },
    onStop: function () {
      Session.set('changingRating', false);
    }
  })
  this.route('exercises', {
    layoutTemplate: "endUserLayout",
    path: '/exercises/:categoryId?',
    waitOn: function(){
      return [
      Meteor.subscribe("exerciseByCategory", this.params.categoryId),
      Meteor.subscribe('patientsExercises'),
      Meteor.subscribe("exerciseMetrics")
      ]
    },
    data: function(){
      var self = this;
      return {
        exercises: function(){
          return Exercises.find({});
        },
        currentCategory: function(){
          return Categories.findOne({_id: self.params.categoryId}) || "all";
        }
      }
    }
  });
  this.route('exercise', {
    layoutTemplate: "endUserLayout",
    path: '/exercise/:_id',
    waitOn: function(){
      return [
        Meteor.subscribe('allExercises', this.params._id),
        Meteor.subscribe('allSyllabus'),
        Meteor.subscribe("patientsExercises"),
        Meteor.subscribe("exerciseMetrics")
      ]
    },
    data: function(){
      var self = this;
      return {
        exercise: function(){
          return Exercises.findOne({_id: self.params._id});
        }
      }
    },
    onStop: function () {
      Session.set('changingRating', false);
    }
  })
});
