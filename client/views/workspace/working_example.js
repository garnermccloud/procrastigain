Template.workingExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('working'),
                intro: "While you work, this screen shows you what task you should be working on and how much time is left in this session.",
                position: 'bottom'
            },
            {
                element: document.getElementById('clockWorking'),
                intro: "Your personal trainer will have you work for 25 minutes per session, which has been shown to increase work efficiency while maintaining motivation.",
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
        Router.go('breakTimeExample');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });
}
