

Template.working.rendered = function() {
    
    var time = Meteor.user().taskTime;
    clock = $('.clock').FlipClock(time, {
    countdown: true 
    });
    
    function timeUp() { return clock.getTime().toString() == "-1";};
    function updateTask() {
	clock.timer._destroyTimer();
	var currentTaskId = Session.get('currentTaskId'); 
	Meteor.call('taskWorkedOn', time, currentTaskId, function(error, completed) {
            if (error)
                throwError(error.reason);
            else {
                Router.go('breakTime', completed);
            }
        }); 
    };
    when(timeUp, updateTask, 2000);
    

};

Template.working.events({
    'click .btn-complete': function(e) {
	e.preventDefault();
	if (confirm("Wow, you finished the task early?")) {
	    
	    var currentTaskId = Session.get('currentTaskId');
	    
	    //set duration to 0 since the task was completed by user
	    var duration = 0;
	    
	    Meteor.call('taskCompleted', duration, currentTaskId, function(error, completed) {
		if (error)
                    throwError(error.reason);
		else {
		    Router.go('breakTime', completed);
		}
	    });
	}
    }
});
			


	
