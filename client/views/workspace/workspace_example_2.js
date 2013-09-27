Template.workspaceExample2.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
	    {
		element: document.getElementById('trainerMessage'),
                intro: "After your break, it's back to your trainer for another work session.",
                position: 'bottom'
	    },
            {
		element: document.getElementById('procrastigain'),
                intro: "If you are feeling burned out from all the work, then it's time to procrastigain!",
                position: 'top'
            }


        ],
        doneLabel: "Next Page",
        showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('procrastigainingExample');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });
}
