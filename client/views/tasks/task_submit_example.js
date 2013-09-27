Template.taskSubmitExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('taskSubmit'),
                intro: "Add your tasks and enter a few details about each so that we can accurately inform your personal trainer.</br> </br>That's right, you have your very own <strong>personal trainer</strong>.",
                position: 'right'
            }
            
        ],
        doneLabel: "Next Page",
	showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('workspaceExample1');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });
}
