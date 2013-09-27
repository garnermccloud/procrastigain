Template.workingExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('working'),
                intro: "This is where you work on your task.",
                position: 'bottom'
            },
            {
                element: document.getElementById('clockWorking'),
                intro: "Studies show that working for 25 minutes per session increases work efficiency while maintaining motivation.",
                position: 'bottom'
            }


        ],
        doneLabel: "Next Page",
        showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('breakTimeExample');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });
}
