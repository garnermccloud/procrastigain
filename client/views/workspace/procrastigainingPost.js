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
    },
    favorite: function () {
	
	var user = Meteor.user();
	if (user.posts) {
	    for (var i = 0; i < user.posts.length; i++) {
		if (this._id == user.posts[i]._id && user.posts[i].favorite)
		    return 'checked';
	    }
	}
	return '';
    }
    



    
});


Template.procrastigaining.created = function() {
    this.clockCreated = false;
};

Template.procrastigaining.rendered = function() {

   //  check to see if starting from the beginning of the procrastigain state machine
    if (amplify.store('previousRoute') != 'procrastigaining' && amplify.store('previousRoute') != 'procrastigainingApp') {
	amplify.store('procrastigainTime',  Meteor.user().procrastigainTime);
    }

    this.startDate = new Date();
    
    var time = amplify.store('procrastigainTime');
    
    
    if (typeof clock != "undefined") clock.clear();
    
    
    clock = timer;
    clock.start(time,document.getElementById('clockProcrastigaining'));
    
    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    //quick reset of the timer array you just cleared
    timeouts = [];
    
    
    
    function timeUp() { return clock.getTimeLeft().toString() == "0";};
    
    function updateProcrastigained() {
        clock.clear();
	var procrastigainPostId = amplify.store('procrastigainPostId');
	
        Meteor.call('updateProcrastigained', time, currentPostId, function(error) {
	    if (error)
                throwError(error.reason);
	    else {
                Router.go('workspace');
	    }
        });
    };
    
    
    
    when(timeUp, updateProcrastigained, 2000);

    

    //clear old iframe if there
    $('#iframeStart').empty();
    
    
    //iframe rendering
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src",  Posts.findOne(amplify.store('procrastigainPostId'), {reactive: false}).url);
    iframe.setAttribute("sandbox", "allow-same-origin allow-forms allow-scripts");
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
    'click #doneProcrastigaining': function(event, template) {
        event.preventDefault();

	var favorite = $('#favorite').attr('checked') ? true : false;
        var endDate = new Date();
        Meteor.call('doneProcrastigaining', amplify.store('procrastigainPostId'), favorite, template.startDate, endDate, function(error) {
            if (error) {
                throwError(error.reason);
		clock.clear();
                Router.go('workspace');
            }
	    
	    else {
		clock.clear();
                Router.go('workspace');
	    }
        });
	
    },
    'click #nextPost': function(event, template) {
	event.preventDefault();
	amplify.store('procrastigainTime', parseInt(clock.getTimeLeft().toString(),10));
	var favorite = $('#favorite').attr('checked') ? true : false;
	var endDate = new Date();
	Meteor.call('nextPost', amplify.store('procrastigainPostId'), favorite, template.startDate, endDate, function(error, id) {
            if (error) {
                throwError(error.reason);
		Router.go('workspace');
	    }
            else {
		var post = {
		    _id: id
		};
		Router.go('procrastigaining', post); 
	    }
	});
    },

	

    'click .upvoteable': function(e) {
	e.preventDefault();
	Meteor.call('upvote', this._id);
    }

});

