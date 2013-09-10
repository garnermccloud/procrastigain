

Template.breakTime.rendered = function() {
    clock = $('.clock').FlipClock(5*60, {
    countdown: true 
    });
   
    function timeUp() { return clock.getTime().toString() == "-1";};
    function goToWorkspace() { 
	clock.timer._destroyTimer();
	Router.go('workspace'); 
};
    when(timeUp, goToWorkspace, 2000);
  
};

