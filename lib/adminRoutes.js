Router.map(function () {
  //admin
  this.route('admin',{
    layoutTemplate: 'adminLayout',
    template: 'adminHome',
    path: '/admin',
    waitOn: function(){
      return [
        Meteor.subscribe("allUsers"),
        Meteor.subscribe("allExercises")
      ]
    },
    //pretty sure we're no longer using this data...
    /*data: function(){
      return {
        account: function(){
          return Meteor.users.find({});
        }
      }
    }, */
    onStop: function () {
      // This is called when you navigate to a new route
      Session.set('adminEditingSelf', false);
      Session.set('adminResetingPassword', false);
    }
  })
  this.route('adminExercises',{
    layoutTemplate: 'adminLayout',
    template: 'adminExercises',
    path: '/admin/exercises/:categoryId?',
    waitOn: function(){
      return [
      Meteor.subscribe("allUsers"),
      Meteor.subscribe("allSyllabus"),
      Meteor.subscribe("allCategories"),
      Meteor.subscribe("exerciseByCategory", this.params.categoryId)
    ]},
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
  this.route('adminExercise',{
    layoutTemplate: 'adminLayout',
    template: 'adminExercise',
    path: '/admin/exercise/:_id',
    waitOn: function(){
      return [
      Meteor.subscribe("allSyllabusExercises"),
      Meteor.subscribe("allSyllabus"),
      Meteor.subscribe("syllabusExercises", this.params._id),
      Meteor.subscribe("oneExercise", this.params._id)
    ]},
    data: function(){
      var self = this;
      return {
        exercise: function(){
          return Exercises.findOne({_id: self.params._id});
        }
      }
    },
    onBeforeAction: function() {
      if (this.data().exercise()) {
        var syllabusIds = _.pluck(this.data().exercise().syllabi().fetch(), "syllabusId");
        this.subscribe('allSyllabi', syllabusIds).wait();
      }
    },
    onStop: function () {
      Session.set('adminEditingExercise', false);
    }
  })
  this.route('adminCategories',{
    layoutTemplate: 'adminLayout',
    template: 'adminCategories',
    path: '/admin/categories',
    waitOn: function(){
      return Meteor.subscribe("allCategories");
      
    },
    data: function(){
      return {
        category: function(){
          return Categories.find({});
        }
      }
    },
    onStop: function () {
      Session.set('adminEditingCategory', false);
    }
  })
  this.route('adminPhysicians',{
    layoutTemplate: 'adminLayout',
    template: 'adminPhysicians',
    path: '/admin/physicians',
    waitOn: function(){
      return Meteor.subscribe("physicians");
    },
    data: function(){
      return {
        physicians: function(){
          return Meteor.users.find({});
        }
      }
    }
  })
  this.route('adminPhysician',{
    layoutTemplate: 'adminLayout',
    template: 'adminPhysician',
    path: '/admin/physician/:_id',
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
      Session.set('adminEditPhysician', false);
      Session.set('adminChangingPhysPassword', false);
    }
  })  
  this.route('adminSyllabus',{
    layoutTemplate: 'adminLayout',
    template: 'adminSyllabus',
    path: '/admin/syllabus/:_id',
    waitOn: function(){
      return [
        //***** PUBLISHING WITH RELATIONS *******************
        //first we subscribe to the syllabus with the id from the route
        //and the syllabus exercises relation db with the syllabus id
        Meteor.subscribe("oneSyllabus", this.params._id),
        Meteor.subscribe("syllabusExercises", this.params._id),
        Meteor.subscribe("allExercises")//to be narrowed down
      ]},
    data: function(){
      var self = this;
      return {
        syllabus: function(){
          return Syllabi.findOne({_id: self.params._id});
        },
        exercises: function(){
          return Exercises.find({})
        }
      }
    },
    /*onBeforeAction: function() {
      if (this.data().syllabus()) {//so when the first set of data comes back
        //I go thorugh all the syllabus exercises and pull of all the exercise Ids
        //console.log(_.pluck(this.data().syllabus().exercises().fetch(), "exerciseId"));
        var exerciseIds = _.pluck(this.data().syllabus().exercises().fetch(), "exerciseId");
        //and send it to the publication that takes an array of exercise ids, and
        //and waits on the publication to come back with data before the route renders
        this.subscribe('exercises', exerciseIds).wait();
      }
    },*/
    onStop: function () {
      // This is called when you navigate to a new route
      Session.set('adminSyllabusEditMode', false);
    }
  })  
  this.route('adminSyllabi',{
    layoutTemplate: 'adminLayout',
    template: 'adminSyllabi',
    path: '/admin/syllabi',
    waitOn: function(){
      return [
      Meteor.subscribe("allUsers"),
      Meteor.subscribe("allSyllabus"),
      Meteor.subscribe("allCategories")
    ]},
    data: function(){
      return {
        syllabi: function(){
          return Syllabi.find({});
        }
      }
    }
  })
  
});