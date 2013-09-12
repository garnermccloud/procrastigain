
Meteor.methods({
     updateProcrastigained: function(time, id) {
	 var user = Meteor.user();


        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to edit settings");

        // ensure settings has a task time
        if (!time)
            throw new Meteor.Error(422, 'You didn\'t procrastigain');


	 // ensure the settings has a procrastigain time
         if (!id)
            throw new Meteor.Error(422, 'There was no post');


	 
	 // pick out the whitelisted keys
        Meteor.users.update(user, {$inc: {procrastigained: time}, $push: {postsRead: id}}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {

            }
        });
    },
});
