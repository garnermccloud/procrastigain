Template.settings.helpers({
    taskTime: function() {
	return Meteor.user().taskTime / 60;
    },
    breakTime: function() {
	return Meteor.user().breakTime / 60;
    },
    procrastigainTime: function() {
	return Meteor.user().procrastigainTime / 60;
    },
    tagString: function() {
	return Meteor.user().tags.toString();
    },
    reusableApps: function() {
	reusableApps = ReusableApps.find({userId: Meteor.userId()});
	
	if (reusableApps.count() == 0) {
	    return false;
	}
	else {
	    return reusableApps;
	}
    }
});

Template.settings.events({
    'submit form .main': function(e) {
	e.preventDefault();
	
	//get times in seconds
	var taskTime =  $(e.target).find('[name=taskTime]').val()*60;
	var breakTime = $(e.target).find('[name=breakTime]').val()*60;
	var procrastigainTime = $(e.target).find('[name=procrastigainTime]').val()*60;
	
	var userProperties = {
	    taskTime: taskTime,
	    breakTime: breakTime,
	    procrastigainTime: procrastigainTime
	};

	//remove extra whitespaces and commas, then make from csv to an array
        var tags = $(e.target).find('[name=tags]').val().split(/[\s,]+/).join();
        if (tags == ",") tags = "";
        else tags = tags.split(',');
        userProperties.tags = tags;

	
	Meteor.call('settingsUpdate', userProperties, function(error) {
	    if (error) {
		throwError(error.reason);
	    }
	    else {
		Router.go('profile');
	    }
	});
    },
    
    'submit form .reusableAppsForm': function(e) {
    }
});
