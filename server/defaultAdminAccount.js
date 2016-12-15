Meteor.startup(function () {
	if (!Meteor.users.findOne({})) {
    Accounts.createUser({
      username: 'square205',
      email: 'square205@gmail.com',
      password: 'rectangle205'
    });
    Meteor.users.update({username: 'square205'}, {$set: {"profile.type": "admin"}});
	}

});