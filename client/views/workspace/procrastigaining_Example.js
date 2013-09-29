Template.procrastigainingExample.rendered = function() {
    

   var iframe = document.getElementById('iframeStart');
    iframe.style.position = "absolute";
    iframe.style.top = $("#iframeStart").offset().top;
   
    iframe.style.left = 0;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = 0;
    //iframe.style.background-color = "transparent";
    iframe.style.border = "0px none transparent";
    iframe.style.padding = "0px";

    iframe.style.paddingBottom = "50px";
    iframe.style.overflow = "visible";

    


intro = introJs();
    intro.setOptions({
        steps:  [
            {
                element: document.getElementById('iframeStart'),
                intro: "Procrastigaining allows you to enjoy educational and productive content, and it's geared toward your interests.",
                position: 'top'
            },
	    {
		element: document.getElementById('posts'),
                intro: "All of our procrastigain content lives here!",
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
        Router.go('newPostsListExample');
    });

    intro.onexit(function() {
        Router.go('tasksList');
    });


}
