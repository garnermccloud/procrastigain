Template.tasksListExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('tasks'),
                intro: "Outside of your personal trainer, you can always see and edit your task list.",
                position: 'top'
            }
            
        ],
        doneLabel: "Next Page",
	showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('newPostsListExample');
    });

    intro.onexit(function() {
        Router.go('allTasksList');
    });
}
