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

