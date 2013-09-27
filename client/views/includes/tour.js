Template.tour.rendered = function() {
    amplify.store("introComplete", false);
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('tourTitle'),
                intro: "We are here to help you get things done. </br></br>So let's get started.",
                position: 'bottom'
            },
            {
                element: document.getElementById('tasksList'),
                intro: "Procrastigain keeps track of everything you need to do.",
                position: 'right',
            }
        ],
	doneLabel: "Next Page",
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


    
