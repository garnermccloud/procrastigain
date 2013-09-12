Template.settings.helpers({
    taskTime: function() {
	return Meteor.user().taskTime / 60;
    },
    breakTime: function() {
	return Meteor.user().breakTime / 60;
    },
    procrastigainTime: function() {
	return Meteor.user().procrastigainTime / 60;
    }
});

Template.settings.events({
    'submit form': function(e) {
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
	
	Meteor.call('settingsUpdate', userProperties, function(error) {
	    if (error) {
		throwError(error.reason);
	    }
	    else {
		Router.go('settings');
	    }
	});
    }
});
