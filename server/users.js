Accounts.onCreateUser(function(options, user) {
    user.tags = ["computers", "startups", "cooking"];
    user.postsRead = [];
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

