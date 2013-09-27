Template.breakTimeExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('clockWorking'),
                intro: "After you complete a work session, you get 5 minutes to do whatever you want to do. As long as it isn't work. </br></br>Your trainer is serious. <strong>Don't work.</strong>  Rest up for the next session.",
                position: 'bottom'
            }


        ],
        doneLabel: "Next Page",
        showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('workspaceExample2');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });
}
