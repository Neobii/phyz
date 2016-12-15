/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.map(function () {  
  this.route("physicianHome", {
    path: '/physician',
    layoutTemplate: "physicianLayout",
    waitOn: function(){
      return Meteor.subscribe("allUsers");
      },
    onStop: function () {
      // This is called when you navigate to a new route
      Session.set('physicianEditingSelf', false);
      Session.set('physicianChangingPassword', false);
    }
  })
this.route('physicianExercises',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianExercises',
    path: '/physician/exercises/:categoryId?',
    waitOn: function(){
      return Meteor.subscribe("exerciseByCategory", this.params.categoryId)
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
  })
  this.route('physicianExercise',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianExercise',
    path: '/physician/exercise/:_id',
    waitOn: function(){
      return [
        Meteor.subscribe("allExercises"),// only single exercise
        Meteor.subscribe("physicianPatients"),
        Meteor.subscribe("patientsExercises"),//publish with relations
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
    }
  })
  this.route('physicianPatient',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianPatient',
    path: '/physician/patient/:_id',
    waitOn: function(){
      return [
        Meteor.subscribe("physicianPatients", this.params._id),
        Meteor.subscribe("allExercises"),
        Meteor.subscribe("allSyllabus"),
        Meteor.subscribe("allSyllabusExercises"),
        Meteor.subscribe("patientsExercises")//publish with relations hallo
      ]
    },
    data: function(){
      var self = this;
      return {
        patient: function(){
          return Meteor.users.findOne({_id: self.params._id});
        },
        syllabi: function(){
          return Syllabi.find({});
        },
        exercise: function(){
          return Exercises.find({});
        }
      }
    },
    onStop: function () {
      // This is called when you navigate to a new route
      Session.set('physicianEditPatient', false);
      Session.set('physChangingPhysPassword', false);
    }
  });
this.route('physicianPatientExercises',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianPatientExercises',
    path: '/physician/patient/exercises/:_id',
    waitOn: function(){
      return [
        Meteor.subscribe("physicianPatients", this.params._id),
        Meteor.subscribe("allExercises"),
        Meteor.subscribe("allSyllabus"),
        Meteor.subscribe("allSyllabusExercises"),
        Meteor.subscribe("patientsExercises")//publish with relations hallo
      ]
    },
    data: function(){
      var self = this;
      return {
        patient: function(){
          return Meteor.users.findOne({_id: self.params._id});
        },
        syllabi: function(){
          return Syllabi.find({"id": Meteor.userId()});
        },
        exercise: function(){
          return Exercises.find({});
        }
      }
    },
    onStop: function () {
      // This is called when you navigate to a new route
      Session.set('physicianEditPatientExercises', false);
    }
  });
  this.route('physicianPatients',{
    template: 'physicianPatients',
    layoutTemplate: 'physicianLayout',
    path: '/physician/patients',
    waitOn: function(){
      return [
        Meteor.subscribe("physicianPatients"),
        Meteor.subscribe("allUsers")
      ]
    },
    data: function(){
      return {
        patients: function(){
          return Meteor.users.find({"profile.type": 'patient', "profile.physicianId": Meteor.userId()});
        }
      }
    }
  })

this.route('physicianTemplate',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianTemplate',
    path: '/physician/template/:_id',
    waitOn: function(){
      return [
        //***** PUBLISHING WITH RELATIONS *******************
        //first we subscribe to the syllabus with the id from the route
        //and the syllabus exercises relation db with the syllabus id
        Meteor.subscribe("oneSyllabus", this.params._id),
        Meteor.subscribe("syllabusExercises", this.params._id),
        Meteor.subscribe("allExercises"),
        Meteor.subscribe("allSyllabus")//to be narrowed down
      ]},
    data: function(){
      var self = this;
      return {
        syllabus: function(){
          return Syllabi.findOne({_id: self.params._id});
        },
        exercises: function(){
          return Exercises.find({})
        },
        syllabi: function(){
          return Syllabi.find({"id": Meteor.userId()});
        }
      }
    },
    onStop: function () {
      // This is called when you navigate to a new route
      Session.set('physicianTemplateEditMode', false);
    }
  })  
  this.route('physicianTemplates',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianTemplates',
    path: '/physician/templates',
    waitOn: function(){
      return [
      Meteor.subscribe("allUsers"),
      Meteor.subscribe("allSyllabus"),
      Meteor.subscribe("allCategories")
    ]},
    data: function(){
      return {
        syllabi: function(){
          return Syllabi.find({"id": Meteor.userId()});
        }
      }
    }
  })


  
 

  this.route('physicianPhysicians',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianPhysicians',
    path: '/physician/physicians',
    waitOn: function(){
      return Meteor.subscribe("physicianPhysicians");
    },
    data: function(){
      return {
        physicians: function(){
          return Meteor.users.find({"profile.type": 'physician', 'profile.physicianId': Meteor.userId()})
        }
      }
    }
  }) 
  this.route('physicianPhysician',{
    layoutTemplate: 'physicianLayout',
    template: 'physicianPhysician',
    path: '/physician/physician/:_id',
    waitOn: function(){
      return Meteor.subscribe("adminPhysician", this.params._id);
    },
    data: function(){
      var self = this;
      return {
        physician: function(){
          return Meteor.users.findOne({_id: self.params._id});
        }
      }
    },
    onStop: function () {
      Session.set('physChangingPhysPassword', false);
      Session.set('physicianEditPhysician', false);
    }
  })

});