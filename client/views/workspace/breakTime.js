

Template.breakTime.rendered = function() {
   var time = Meteor.user().breakTime;
   if (typeof clock != "undefined") clock.clear();

    clock = timer;
    clock.start(time,document.getElementById('clockWorking'));

   
    function timeUp() { return clock.getTimeLeft().toString() == "0";};
    function goToWorkspace() { 

	clock.clear();
	Router.go('workspace'); 
};
    when(timeUp, goToWorkspace, 2000);
  
};

