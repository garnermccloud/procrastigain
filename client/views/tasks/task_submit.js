Template.taskSubmit.events({
    'submit form': function(e) {
	e.preventDefault();

	//get duration in seconds
	var duration =  $(e.target).find('[name=duration-hours]').val()*3600 + 
	    $(e.target).find('[name=duration-minutes]').val()*60;

	//create proposed task from inputs
	var task = {
            title: $(e.target).find('[name=title]').val(),
	    duration: duration,
	    appeal: $(e.target).find('[name=appeal]').val(),
	    dateDue: new Date($(e.target).find('[name=dateDue]').val().replace(/-/g, "/"))
	    }
	
	Meteor.call('task', task, function(error, id) {
	    if (error) {
		throwError(error.reason);
	    }
	    else {
	    task._id = id;
	    Router.go('allTasksList');
	    }
	});
    }
});
