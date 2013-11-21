 Accounts.loginServiceConfiguration.remove({
        service: "facebook"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "facebook",
        appId: "529657053789199",
        secret: "7c718b0584900ed38e8ab256a4959de7"
    });

 Accounts.loginServiceConfiguration.remove({
        service: "google"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "1073701798617.apps.googleusercontent.com",
        secret: "OYcYBXSMAQT3umucSI68Z4S6"
    });


/*
User = {
    tags: ["computers", "cooking", "startups"],
    taskTime: an int representing time for each task work session,
    breakTime: an int representing time for each break session,
    procrastigainTime: an int representing time for each procrastigain session,
    posts: [
	post1 = {
	    id: postId,
	    read: false,
	    favorite: false,
	    dates: [ 
		[startDate1,endDate1], 
		[startDate2,endDate2], 
		[startDate3,endDate3], 
		    ... 
	    ]
	},
	 post2 = {
            id: postId,
            read: true,
            favorite: false,
            dates: [
                [startDate1,endDate1],
                [startDate2,endDate2],
                [startDate3,endDate3],
                    ...
            ]
        }
    ]
}
*/	
    
    







Accounts.onCreateUser(function(options, user) {

    if (user.services) {
	var service = _.keys(user.services)[0];
	var email = user.services[service].email;
	
	// see if any existing user has this email address, otherwise create new
	var existingUser = Meteor.users.findOne({'emails.address': email});
	if (existingUser) {
	    // precaution, these will exist from accounts-password if used
	    if (!existingUser.services)
		existingUser.services = { resume: { loginTokens: [] }};
	    
	    // copy accross new service info
	    existingUser.services[service] = user.services[service];
	    existingUser.services.resume.loginTokens.push(
		user.services.resume.loginTokens[0]
	    );
	    
	    // even worse hackery
	    Meteor.users.remove({_id: existingUser._id}); // remove existing record
	    return existingUser;      // record is re-inserted
	}
    }
    
    user.tags = ["computers", "startups", "cooking"];
    user.posts = [];
    user.taskTime = 25*60;
    user.breakTime = 5*60;
    user.procrastigainTime = 15*60;
    user.procrastigainLeft = 5;
    user.procrastigained = 0;
    user.justCreated = true;
    
    if (options.profile)
	user.profile = options.profile;
    return user;
});

