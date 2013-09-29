Template.newPostsListExample.rendered = function() {
    intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('somePosts'),
                intro: "You can discover all of the procrastigain content here.  By clicking \"discuss\" on a post, you can see it's discussion and add you own comments.<br/><br/> You can also contribute to the community by submitting your own posts!",
                position: 'top'
            },
	    {
                element: document.getElementById('Intercom'),
                intro: "Thanks for checking out the tour! If you have any questions or suggestions for improving Procrastigain, please send us a message by clicking \"Support\"!",
                position: 'left'
            }
            
        ],
        hideNavigation: true,
        hideSkipDone: true,
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
