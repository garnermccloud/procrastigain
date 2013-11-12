Template.procrastigainingApp.helpers({
    app: function() {
	return this;
    }
});

Template.procrastigainingApp.rendered = function() {
    var time = Meteor.user().procrastigainTime;
    if (typeof clock != "undefined") clock.clear();
    clock = timer;
    clock.start(time,document.getElementById('clockProcrastigaining'));
    
    function timeUp() { return clock.getTimeLeft().toString() == "0";};

    function updateProcrastigained() {
        clock.clear();
	var currentPostId = Session.get('currentPostId');
	var isApp = true;
	
	Meteor.call('updateProcrastigained', time, currentPostId, isApp, function(error) {
            if (error)
                throwError(error.reason);
            else {
                Router.go('workspace');
            }
        });
    };

    
    when(timeUp, updateProcrastigained, 2000);
    
// if app has a url, render the iframe, otherwise boldly display for them the title of what they should be procrastigaining (done in html template

    if (ReusableApps.findOne(Session.get('currentAppId')).url) {

	//iframe rendering
	var iframe = document.createElement("IFRAME");
	iframe.setAttribute("src",  ReusableApps.findOne(Session.get('currentAppId')).url);
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
	
    }
    
};


Template.procrastigainingApp.events({
    'click .btn-success': function(e) {
        e.preventDefault();
        if (confirm("Wow, you finished the app early?")) {
	    var currentPostId = Session.get('currentAppId');
	    var time = Meteor.user().procrastigainTime - parseInt(clock.getTimeLeft().toString(),10);
            Meteor.call('updateProcrastigained', time, currentAppId, function(error) {
		if (error)
                    throwError(error.reason);
		else {
		    clock.clear();
                    Router.go('workspace');
		}
            });
        }
    }

    
});

