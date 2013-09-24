Template.procrastigaining.helpers({
    post: function() {
	return this;
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
    if (typeof clock != "undefined") clock.clear();
    clock = timer;
    clock.start(time,document.getElementById('clockProcrastigaining'));
    
    function timeUp() { return clock.getTimeLeft().toString() == "0";};

    function updateProcrastigained() {
        clock.clear();
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
    

    //iframe rendering
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src",  Posts.findOne(Session.get('currentPostId')).url);
    iframe.style.position = "absolute";
    iframe.style.top = $("#iframeStart").offset().top;
    iframe.style.left = 0;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = 0;
    //iframe.style.background-color = "transparent";
    iframe.style.border = "0px none transparent";
    iframe.style.padding = "0px";
    iframe.style.paddingBottom = "50px";
    iframe.style.overflow = "visible";

    document.getElementById('iframeStart').appendChild(iframe);



};


Template.procrastigaining.events({
    'click .btn-success': function(e) {
        e.preventDefault();
        if (confirm("Wow, you finished the task early?")) {
	    var currentPostId = Session.get('currentPostId');
	    var time = Meteor.user().procrastigainTime - parseInt(clock.getTimeLeft().toString(),10);
            Meteor.call('updateProcrastigained', time, currentPostId, function(error) {
		if (error)
                    throwError(error.reason);
		else {
		    clock.clear();
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

