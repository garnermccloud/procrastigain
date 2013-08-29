Template.taskEdit.helpers({
  task: function() {
    return Tasks.findOne(Session.get('currentTaskId'));
  },
    durationHours: function() {
	return Math.floor(this.duration / 3600);
    },
    durationMinutes: function() {
	return Math.floor(((this.duration / 3600) - Math.floor(this.duration / 3600)) * 60);
    },
    dateDueString: function() {
	return this.dateDue.toISOString().substring(0, 10);
    }
    
});

Template.taskEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentTaskId = Session.get('currentTaskId');

	//get duration in seconds
        var duration =  $(e.target).find('[name=duration-hours]').val()*3600 +
            $(e.target).find('[name=duration-minutes]').val()*60;


        var taskProperties = {
            title: $(e.target).find('[name=title]').val(),
            duration: duration,
            appeal: $(e.target).find('[name=appeal]').val(),
            dateDue: new Date($(e.target).find('[name=dateDue]').val().replace(/-/g, "/"))
	    
        }
        Meteor.call('taskEdit', taskProperties, currentTaskId, function(error, id) {
            if (error)
                throwError(error.reason);
            else {
		taskProperties._id = id;
		Router.go('taskPage', taskProperties);
	    }
        });
	
    },


    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this task?")) {
            var currentTaskId = Session.get('currentTaskId');
            Tasks.remove(currentTaskId);
            Router.go('tasksList');
        }
    }

});
