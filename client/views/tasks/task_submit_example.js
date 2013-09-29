Template.taskSubmitExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('taskSubmit'),
                intro: "Add your tasks and enter a few details about each so that your personal trainer can tailor your work sessions for you.</br> </br>That's right, you have your very own <strong>personal trainer!</strong>  How cool is that?",
                position: 'right'
            },
	     {
                element: document.getElementById('personalTrainer'),
                intro: "You can head to your Personal Trainer here once you've added a few tasks and are ready to be productive!",
                position: 'right'
            }
            
        ],
        doneLabel: "Next Page",
	hideNavigation: true,
        hideSkipDone: true,
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
