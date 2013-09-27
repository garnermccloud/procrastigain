Template.newPostsListExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('somePosts'),
                intro: "And you can discover new procrastigain content or submit your own.",
                position: 'top'
            },
	    {
                element: document.getElementById('Intercom'),
                intro: "If you have any questions or suggestions for improving Procrastigain, please send us a message!",
                position: 'left'
            }
            
        ],
	showStepNumbers: false

    });

    intro.start();

    intro.oncomplete(function() {
        Router.go('tasksList');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });
}
