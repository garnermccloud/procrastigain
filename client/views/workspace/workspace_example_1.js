Template.workspaceExample1.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('trainerMessage'),
                intro: "Your personal trainer will give you suggestions on what to work on.",
                position: 'bottom'
            },
	    {
		element: document.getElementById('mainTask'),
                intro: "Click on a suggestion to begin working.",
                position: 'bottom'
            }


        ],
        doneLabel: "Next Page",
	hideNavigation: true,
        hideSkipDone: true,
        showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('workingExample');
    });

    intro.onexit(function() {
        Router.go('allTasksList');
    });
}
