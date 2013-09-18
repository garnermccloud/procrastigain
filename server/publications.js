Meteor.publish('newPosts', function(limit) {
  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('submittedPosts', function(limit) {
  return Posts.find({userId: Meteor.UserId()}, {sort: {votes: -1, submitted: -1}, limit: limit});
});


Meteor.publish('singlePost', function(id) {
  return Posts.find(id);
});

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
						  procrastigained: 1, postsRead: 1, tags: 1}});
});
