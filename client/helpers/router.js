Meteor.subscribe('notifications');
Meteor.subscribe('currentUser');

newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);

bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

submittedPostsHandle = Meteor.subscribeWithPagination('submittedPosts', 10);

taggedPostsHandle = Meteor.subscribeWithPagination('taggedPosts',Session.get('currentTag'), 10);



Subscriptions = {
    newPosts: newPostsHandle,
    bestPosts: bestPostsHandle,
    submittedPosts: submittedPostsHandle,
    tasks: Meteor.subscribe('tasks'),
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
    this.route('taggedPostsList', {
	path: '/tags/:_id',
	data: function() { 
	    Session.set('currentTag', this.params._id);
	    return this.params;
	}
    });
    this.route('tasksList', {
	path: '/tasks',
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
	before: function() {  Session.set('currentPostId', this.params._id);},
	path: '/procrastigaining/:_id',
	data: function() { return Posts.findOne(this.params._id,{reactive: false}); },
	waitOn: Subscriptions['singlePost']
    });
    
    this.route('breakTime', {
	path: '/breakTime',
	data: function() { var task = {completed: this.params};
			   return task;
			 }
    });
    this.route('home', {path: '/'});
    this.route('login', {path: '/login'});
    this.route('settings', {path: '/settings'});
    this.route('profile', {path: '/profile'});
    this.route('accessDenied', {path: '/accessDenied'});

});





Router.configure({
    layout: 'main',


    before: function() {
	var routeName = this.context.route.name;
	clearErrors();
	// no need to check at these URLs
	if (_.include(['login', 'passwordReset', 'newPostsList', 'bestPostsList', 'home', 'postPage', 'accessDenied' /*, etc */], routeName))
	    return;
	
	var user = Meteor.user();
	if (! user) {
	    this.render(Meteor.loggingIn() ? this.loadingTemplate : 'accessDenied');
	    return this.stop();
	}
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
