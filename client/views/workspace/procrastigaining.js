Template.procrastigaining.helpers({
  postUrl: function() {
      var url = "http://www.smashingmagazine.com/2013/06/13/build-app-45-minutes-meteor/";
      return url;
  }
});

Template.procrastigaining.rendered = function() {
    var time = 25*60;
    clock = $('.clock').FlipClock(time, {
    countdown: true 
    });

    function timeUp() { return clock.getTime().toString() == "-1";};
    function goToWorkspace() {
        clock.timer._destroyTimer();
        Router.go('workspace');
    };
    when(timeUp, goToWorkspace, 2000);
    

};


Template.procrastigaining.events({
    'click .btn-complete': function(e) {
        e.preventDefault();
        if (confirm("Wow, you finished the task early?")) {

            Router.go('workspace');
        }
    }
});

