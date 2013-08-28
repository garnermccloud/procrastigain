Template.taskEdit.helpers({
  task: function() {
    return Tasks.findOne(Session.get('currentTaskId'));
  }
});

Template.taskEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentTaskId = Session.get('currentTaskId');

        var taskProperties = {
            title: $(e.target).find('[name=title]').val(),
            dateDue: $(e.target).find('[name=dateDue]').val()
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
