Meteor.publish('newPosts', function(limit) {
  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('submittedPosts', function(limit) {
  return Posts.find({userId: this.userId}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('taggedPosts', function(tag, limit) {
  return Posts.find({tags: tag}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('favoritePosts', function() {
    if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
        //var user is the same info as would be given in Meteor.user();
    }
    var favoritePosts = [];
    if (user.posts) {
	for (var i=0; i < user.posts.length; i++) {
	    if (user.posts[i].favorite == true)
                favoritePosts.push(user.posts[i]._id);
        }
    }
    return Posts.find({_id: {$in: favoritePosts } }, {sort: {votes: -1, submitted: -1} } );
});

Meteor.publish('readPosts', function() {
    if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
        //var user is the same info as would be given in Meteor.user();
    }
    var readPosts = [];
    if (user.posts) {
        for (var i=0; i < user.posts.length; i++) {
            if (user.posts[i].read == true)
                readPosts.push(user.posts[i]._id);
        }
    }
    return Posts.find({_id: {$in: readPosts } }, {sort: {votes: -1, submitted: -1} } );
});




Meteor.publish('singlePost', function(id) {
  return Posts.find(id);
});

Meteor.publish('procrastigainPost', function(id) {
    return Posts.find(id);
});

//Meteor.publish('reusableApps', function() {
//    return ReusableApps.find({userId:this.userId});
//});


Meteor.publish('tasks', function() {
    return Tasks.find({userId:this.userId});
});

Meteor.publish('comments', function(postId) {
  return Comments.find({postId:postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('currentUser', function() {
  return Meteor.users.find(this.userId, {fields: {createdAt: 1, taskTime: 1, breakTime: 1,
						  procrastigainTime: 1, procrastigainLeft: 1, 
						  procrastigained: 1, posts: 1, tags: 1, justCreated: 1}});
});
