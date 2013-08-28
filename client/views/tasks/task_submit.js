Template.taskSubmit.events({
    'submit form': function(e) {
	e.preventDefault();
	
	var task = {
            title: $(e.target).find('[name=title]').val(),
	    dateDue: $(e.target).find('[name=dateDue]').val()
	}
	
	Meteor.call('task', task, function(error, id) {
	    if (error) {
		throwError(error.reason);
	    }
	    else {
	    task._id = id;
	    Router.go('taskPage', task);
	    }
	});
    }
});
