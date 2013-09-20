Posts = new Meteor.Collection('posts');


Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title', 'tags').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new links");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');
      
      //ensure the post has at least one tag
      if (!postAttributes.tags) 
	   throw new Meteor.Error(422, 'Please add tags to this post');
      

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 
        'This link has already been posted', 
        postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'tags'), {
	userId: user._id, 
	author: user.username, 
	submitted: new Date().getTime(),
	commentsCount: 0,
	upvoters: [],
	votes: 0
    });

    var postId = Posts.insert(post);

    return postId;
  },
    
    postEdit: function(postAttributes, id) {
	var user = Meteor.user();
	var postId = id,
	postWithSameLink = Posts.findOne({url: postAttributes.url});
	
	// ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login to edit posts");
	
	// ensure the post has a title
	if (!postAttributes.title)
	    throw new Meteor.Error(422, 'Please fill in a headline');
	

	//ensure the post has at least one tag
	if (!postAttributes.tags)
            throw new Meteor.Error(422, 'Please add tags to this post');


	// check that there are no previous posts with the same link
	if (postAttributes.url && postWithSameLink && (postId != postWithSameLink._id)) {
	    throw new Meteor.Error(302,
				   'This link has already been posted',
				   postWithSameLink._id);
	}
	
	// pick out the whitelisted keys
	Posts.update(postId, {$set: postAttributes}, function(error) {
	    if (error) {
		// display the error to the user
		alert(error.reason);
	    } else {
		
	    }
	});
	
	return postId;
    },
    
    upvote: function(postId) {
	var user = Meteor.user();
	// ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login to upvote");
	var post = Posts.findOne(postId);
	if (!post)
	    throw new Meteor.Error(422, 'Post not found');
	if (_.include(post.upvoters, user._id))
	    throw new Meteor.Error(422, 'Already upvoted this post');
	Posts.update({
	    _id: postId, 
	    upvoters: {$ne: user._id}
	}, {
	    $addToSet: {upvoters: user._id},
	    $inc: {votes: 1}
	});
    },
    
    procrastigaining: function() {
	var user = Meteor.user();
	
	// ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to do this");
	
	var post = Posts.findOne({ _id: { $nin: user.postsRead } }, {sort: {votes: -1, submitted: 1}});

	if (!post)
	    throw new Meteor.Error(422, "You've read all of the posts under your interests. Add more interests!");
	
	
	return post._id;
    }
    
});
