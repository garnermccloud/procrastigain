Meteor.subscribe('notifications');
Meteor.subscribe('currentUser');

newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);

bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

submittedPostsHandle = Meteor.subscribeWithPagination('submittedPosts', 10);

taggedPostsHandle = Meteor.subscribeWithPagination('taggedPosts',Session.get('currentTag'), 10);

favoritePostsHandle = Meteor.subscribeWithPagination('favoritePosts', 10);

readPostsHandle = Meteor.subscribeWithPagination('readPosts', 10);



Subscriptions = {
    newPosts: newPostsHandle,
    bestPosts: bestPostsHandle,
    submittedPosts: submittedPostsHandle,
    favoritePosts: favoritePostsHandle,
    readPosts: readPostsHandle,
    tasks: Meteor.subscribe('tasks'),
    //    reusableApps: Meteor.subscribe('reusableApps'),
    procrastigainPost:  Meteor.subscribe('procrastigainPost', amplify.store('procrastigainPostId')),
    singlePost: function() {
	return Meteor.subscribe('singlePost', Session.get('currentPostId'));
    }
    
};

Deps.autorun(function() {
    Meteor.subscribe('comments', Session.get('currentPostId'));
    Meteor.subscribe('singlePost', Session.get('currentPostId'));
});




Router.map(function() {
    
    this.route('newPostsList', {path:'/new'});
    this.route('bestPostsList', {path:'/best'});
    this.route('submittedPostsList', {path: '/submitted'});
    this.route('favoritePostsList', {
	path: '/favorite',
	waitOn: Subscriptions['favoritePosts']
    });
    this.route('readPostsList', {
	path: '/read',
	waitOn: Subscriptions['readPosts']
    });

    this.route('taggedPostsList', {
	path: '/tags/:_id',
	data: function() { 
	    Session.set('currentTag', this.params._id);
	    return this.params;
	}
    });
    this.route('allTasksList', {
	path: '/tasks',
	waitOn: Subscriptions['tasks']
    });

    this.route('todayTasksList', {
        path: '/tasks/today',
        waitOn: Subscriptions['tasks']
    });

    this.route('threeDaysTasksList', {
        path: '/tasks/threeDays',
        waitOn: Subscriptions['tasks']
    });

    this.route('sevenDaysTasksList', {
        path: '/tasks/sevenDays',
        waitOn: Subscriptions['tasks']
    });





    this.route('completedTasksList', {
        path: '/completedTasks',
        waitOn: Subscriptions['tasks']
    });

    this.route('postPage', {
	before: function() {  Session.set('currentPostId', this.params._id);},
	path: '/posts/:_id',
	data: function() { return Posts.findOne(this.params._id);},    
	waitOn: Subscriptions['singlePost']
    });

    this.route('postEdit', {
	before: function() {  Session.set('currentPostId', this.params._id);},
        path: '/posts/:_id/edit',
        data: function() { return Posts.findOne(this.params._id);},
        waitOn: Subscriptions['singlePost']
    });


    this.route('postSubmit', {path: '/submit/post'});
    

    //    this.route('reusableAppSubmit', {path: '/submit/reusableApp'});





    this.route('taskPage', {
	path: '/tasks/:_id',
	data: function() { Session.set('currentTaskId', this.params._id);
			 return Tasks.findOne(this.params._id);},
	waitOn: Subscriptions['tasks']
    });

    this.route('taskEdit', {
        path: '/tasks/:_id/edit',
        data: function() { Session.set('currentTaskId', this.params._id);
                         return Tasks.findOne(this.params._id);},
        waitOn: Subscriptions['tasks']
    });
    this.route('taskSubmit', {path: '/submit/task'});
    
    this.route('workspace', {path: '/trainer'});
    this.route('working', {
	path: '/working/:_id',
        data: function() { Session.set('currentTaskId', this.params._id);
                         return Tasks.findOne(this.params._id);},
        waitOn: Subscriptions['tasks']
    });
    

    this.route('procrastigaining', {
	before: function() {  amplify.store('procrastigainPostId', this.params._id);},
        path: '/procrastigaining/:_id',
        data: function() { 
	    console.log('Subscription returned? ', Subscriptions['procrastigainPost']);
	    return Posts.findOne(this.params._id,{reactive: false}); },
        waitOn: Subscriptions['procrastigainPost']
    });

    this.route('procrastigainingApp', {
        before: function() {  Session.set('currentAppId', this.params._id);},
        path: '/procrastigaining/app/:_id',
        data: function() { return ReusableApps.findOne(this.params._id,{reactive: false}); },
        waitOn: Subscriptions['reusableApps']
    });

    
    this.route('breakTime', {
	path: '/breakTime',
	data: function() { var task = {completed: this.params};
			   return task;
			 }
    });

    //tour pages
    this.route('tour', {path: '/tour'});
    this.route('taskSubmitExample', {path: '/submit/task/example'});
    this.route('workspaceExample1', {path: '/trainer/example1'});
    this.route('workingExample', {path: '/working/example'});
    this.route('breakTimeExample', {path: '/breakTime/example'});
    this.route('workspaceExample2', {path: '/trainer/example2'});
    this.route('procrastigainingExample', {path: '/procrastigaining/example'});
    this.route('tasksListExample', {path: '/tasks/example'});
    this.route('newPostsListExample', {path: '/posts/example'});


    this.route('landing', {path: '/'});
    this.route('login', {path: '/login'});
    this.route('settings', {path: '/settings'});
    this.route('profile', {path: '/profile'});
    this.route('accessDenied', {path: '/accessDenied'});

});





Router.configure({
    layoutTemplate: 'main',


    before: function() {
	for (var i = 0; i < timeouts.length; i++) {
	    clearTimeout(timeouts[i]);
	}
	//quick reset of the timer array you just cleared
	timeouts = [];
	if (typeof clock != "undefined") clock.clear();
	
	var routeName = this.route.name;
	
	//update route states
	amplify.store('previousRoute',amplify.store('currentRoute'));
	amplify.store('currentRoute', routeName);

	clearErrors();
	// no need to check at these URLs
	if (_.include(['login', 'passwordReset', 'newPostsList', 'bestPostsList', 'taggedPostsList', 'landing', 'postPage', 'accessDenied' /*, etc */], routeName))
	    return;
	
	var user = Meteor.user();
	if (! user) {
	    this.render(Meteor.loggingIn() ? this.loadingTemplate : 'accessDenied');
	    return this.stop();
	}
	return;
	
    },
    after: function() {
	_gaq.push(['trackPageview']);
    },


  notFoundTemplate: 'notFound',

  loadingTemplate: 'loading',
/*
  renderTemplates: { 
    /* render the templated named footer to the 'footer' yield 
    'footer': { to: 'footer' },

    /* render the template named sidebar to the 'sidebar' yield 
    'sidebar': { to: 'sidebar' }
  }
*/
});
