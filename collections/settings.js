Meteor.users.allow({
    update: ownsDocument
});

Meteor.methods({
     settingsUpdate: function(userAttributes) {
	 var user = Meteor.user();


        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to edit settings");

        // ensure settings has a task time
        if (!userAttributes.taskTime)
            throw new Meteor.Error(422, 'Please fill in an amount for work session length');


	 // ensure the settings has a break time
	 if (!userAttributes.breakTime)
            throw new Meteor.Error(422, 'Please fill in an amount for break time length');

         // ensure the settings has a procrastigain time
         if (!userAttributes.procrastigainTime)
            throw new Meteor.Error(422, 'Please fill in an amount for procrastigain time length');


	 
	 // pick out the whitelisted keys
        Meteor.users.update(user, {$set: userAttributes}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {

            }
        });
    },
});
