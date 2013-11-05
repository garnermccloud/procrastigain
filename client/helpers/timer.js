timer = {
    start: function(time, clock) {
	
	var start = new Date().getTime();
	var setTimeLeft = this.setTimeLeft;
	setTimeLeft(time);
	time = time*1000;
	
	var minutes = parseInt(time/1000/ 60);
        var seconds = parseInt(time/1000 % 60);
	var useSound = true;
	var useTitleAlert = true;

	clock.innerHTML = timer.clockStyle(minutes) + ":" + timer.clockStyle(seconds);
	timer.interval = setInterval(function() {
            var now = time-(new Date().getTime()-start);
	    
	    if (now < (5*1000) && useSound) {
		useSound = false;
		document.getElementById("sound").innerHTML="<audio autoplay><source src='/3timer6.wav' type='audio/mpeg'>Your browser does not support the audio element.</audio>";
	    }		
	     if (now < (2*1000) && useTitleAlert) {
		 useTitleAlert = false;
		 $.titleAlert("Timer Finished!", {
		     requireBlur:true,
		     stopOnFocus:true,
		     interval:500
		 });
	     }
		 
	    if( now <= 0) {
		setTimeLeft(0);	
		clearInterval(timer.interval);
		minutes = parseInt(now / 60);
		seconds = parseInt(now % 60);
		clock.innerHTML = timer.clockStyle(minutes) + ":" + timer.clockStyle(seconds);
            }
            else setTimeLeft(Math.floor(now/1000));
            minutes = parseInt(now /1000/ 60);
            seconds = parseInt(now /1000% 60);
            clock.innerHTML = timer.clockStyle(minutes) + ":" + timer.clockStyle(seconds);
	},100);
    },
    setTimeLeft: function(time) {
	timer.time = time;
    },
    
    getTimeLeft: function () {
	return timer.time;
    },
    
    clear: function() {
	clearInterval(timer.interval);
    },
    clockStyle: function(time) {
	if (time.toString().length == 1)
	    return "0" + time;
	else return time;
    }
}
