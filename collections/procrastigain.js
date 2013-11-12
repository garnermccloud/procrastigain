
Meteor.methods({
     updateProcrastigained: function(time, id, isApp) {
	 var user = Meteor.user();

        // ensure the user is logged in
	 if (!user)
             throw new Meteor.Error(401, "You need to login first!");
	 if (isApp) {

	     if (!time)
                 throw new Meteor.Error(422, 'You didn\'t procrastigain');
	     
	     
	     
             if (!id)
                 throw new Meteor.Error(422, 'There was no app');

	     var endDate = new Date();

	     var startDate = new Date(endDate - (time*1000));

	     ReusableApps.update(id, { $push: { workedDates: [startDate, endDate] } } );


	     Meteor.users.update(user, {$inc: {procrastigained: time} }, function(error) {
                 if (error) {
                     // display the error to the user
                     alert(error.reason);
                 } else {
		     
                 }
             });
	 
	 }

         else {
	     
	     
             
             if (!time)
		 throw new Meteor.Error(422, 'You didn\'t procrastigain');
	     
	     
	     
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
	 }
     },
});
