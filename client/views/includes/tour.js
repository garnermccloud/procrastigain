Template.tour.rendered = function() {
    amplify.store("introComplete", false);
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('tourTitle'),
                intro: "We are here to help you get things done. So let's get started!  </br></br>(Press the right arrow key to move through the tour.)   </br></br>(You can exit the tour by clicking the screen at anytime.)",
                position: 'bottom'
            },
            {
                element: document.getElementById('tasksList'),
                intro: "Procrastigain keeps track of everything you need to do.",
                position: 'right',
            }
        ],
	doneLabel: "Next Page",
	hideNavigation: true,
	hideSkipDone: true,
        showStepNumbers: false
	
    });
    
    intro.start();
    
    intro.oncomplete(function() {
        Router.go('taskSubmitExample');
    });

    intro.onexit(function() {
	amplify.store("introComplete",true);
	Router.go('tasksList');
    });
}


    
