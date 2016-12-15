Router.map(function () {
  //practice admin
  this.route('practiceAddPhysician',{
    layoutTemplate: 'practiceAdminLayout',
    template: 'addPracticePhysician',
    path: '/practiceAdmin/addPhysician',
    waitOn: function(){
      return Meteor.subscribe("practicePhysicians");
    },
    data: function(){
      return {
        physicians: function(){
          return Meteor.users.find({'profile.type': 'physician'});
        }
      }
    }
  })
  this.route('practiceEditPhysician',{
    layoutTemplate: 'practiceAdminLayout',
    template: 'editPracticePhysician',
    path: '/practiceAdmin/editPhysician',
    waitOn: function(){
      return Meteor.subscribe("practicePhysicians");
    },
    data: function(){
      return {
        physicians: function(){
          return Meteor.users.find({});
        }
      }
    }
  })
  this.route('practiceRemovePhysician',{
    layoutTemplate: 'practiceAdminLayout',
    template: 'removePracticePhysician',
    path: '/practiceAdmin/removePhysician',
    waitOn: function(){
      return Meteor.subscribe("practicePhysicians");
    },
    data: function(){
      return {
        physicians: function(){
          return Meteor.users.find({});
        }
      }
    }
  })
  this.route('practiceAdmin',{
    layoutTemplate: 'practiceAdminLayout',
    template: 'practiceAdminHome',
    path: '/practiceAdmin',
    waitOn: function(){
      return Meteor.subscribe("allUsers");
    },
    data: function(){
      return {
        account: function(){
          return Meteor.users.find({});
        }
      }
    }
  })
  this.route('allPracticePhysicians',{
    layoutTemplate: 'practiceAdminLayout',
    template: 'viewAllPracticePhysicians',
    path: '/practiceAdmin/allPhysicians',
    waitOn: function(){
      return Meteor.subscribe("practicePhysicians");
    },
    data: function(){
      return {
        physician: function(){
          return Meteor.users.find({});
        }
      }
    }
  })
})