ReusableApps = new Meteor.Collection('reusableApps');

ReusableApps.allow({
    update: ownsDocument,
    remove: ownsDocument
});

ReusableApps.deny({
    update: function(userId, reusableApp, fieldNames) {
	// may only edit the following two fields:
	return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    reusableApp: function(reusableAppAttributes) {
	var user = Meteor.user();
	
	// ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login to add your reusable app!");
	
    // ensure the reusableApp has a title
	if (!reusableAppAttributes.title)
	    throw new Meteor.Error(422, 'Please fill in a title');
	
	
	// pick out the whitelisted keys
	var reusableApp = _.extend(_.pick(reusableAppAttributes, 'url', 'title'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
	});
	
	var reusableAppId = ReusableApps.insert(reusableApp);
	
	return reusableAppId;
    },

    reusableAppEdit: function(reusableAppAttributes, id) {
        var user = Meteor.user();
        var reusableAppId = id;
        	
        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to edit your reusable apps!");
	
        // ensure the reusable app has a title
        if (!reusableAppAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a title');
	
	
        // pick out the whitelisted keys
        ReusableApps.update(reusableAppId, {$set: reusableAppAttributes}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
		
            }
        });
	
        return reusableAppId;
    }
});
