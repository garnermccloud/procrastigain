Template.procrastigaining.helpers({
    post: function() {
	return Posts.findOne(Session.get('currentPostId'));
    },

    upvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvoteable';
        } else {
            return 'disabled';
        }
    }


    
});

Template.procrastigaining.rendered = function() {
    var time = Meteor.user().procrastigainTime;
    clock = $('.clock').FlipClock(time, {
    countdown: true 
    });

    function timeUp() { return clock.getTime().toString() == "-1";};
    function updateProcrastigained() {
        clock.timer._destroyTimer();
	var currentPostId = Session.get('currentPostId');

	Meteor.call('updateProcrastigained', time, currentPostId, function(error) {
            if (error)
                throwError(error.reason);
            else {
                Router.go('workspace');
            }
        });
    };
    when(timeUp, updateProcrastigained, 2000);
    

};


Template.procrastigaining.events({
    'click .btn-complete': function(e) {
        e.preventDefault();
        if (confirm("Wow, you finished the task early?")) {
	    var currentPostId = Session.get('currentPostId');
	    var time = Meteor.user().procrastigainTime - parseInt(clock.getTime().toString(),10);
            Meteor.call('updateProcrastigained', time, currentPostId, function(error) {
		if (error)
                    throwError(error.reason);
		else {
                    Router.go('workspace');
		}
            });
        }
    },

    'click .upvoteable': function(e) {
	e.preventDefault();
	Meteor.call('upvote', this._id);
    }

});

