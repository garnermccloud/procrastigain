Posts = new Meteor.Collection('posts');


Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following three fields:
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
	if (_.include(post.upvoters, user._id)) {	    
	    //throw new Meteor.Error(422, 'Already upvoted this post');
	    Posts.update({
                _id: postId,
                upvoters: user._id
            }, {
                $pull: {upvoters: user._id},
		$inc: {votes: -1}
            });
	    
	}
	else {
	    Posts.update({
		_id: postId, 
		upvoters: {$ne: user._id}
	    }, {
		$addToSet: {upvoters: user._id},
		$inc: {votes: 1}
	    });
	}
    },

    favorite: function(postId) {
        //three states
	//0 - post isn't in the users post
	//1 - the post is in the users post and favorite = false
	//2 - the post is in the users post and favorite = true
	
	
	var user = Meteor.user();
	
	// ensure the user is logged in
	if (!user)throw new Meteor.Error(401, "You need to login first!");
	
	var inUserPosts = false;
	var favorite = false;
	
	
	if (user.posts){
            for (var i=0; i<user.posts.length; i++) {
                if (user.posts[i]._id == postId) {
                    inUserPosts = true;
		    
		    if (user.posts[i].favorite)
			favorite = true;
		    break;
		}
	    }
	}
  
	//state 0
	if  (!inUserPosts) {
	    //add the post to the users post list and mark favorite it as true
	    var post = {
		_id: postId,
		read: false,
		favorite: true,
		dates: []
            };
	    Meteor.users.update(
		user._id,
		{ 
		    $push: {
			posts: post
		    } 
		}
	    );
	    return;
	}
	
	// state 1
	else if (!favorite) {

	    //update the post in the users post list by marking favorite as true
	    //note: positional update on works on server with regular mongodb, client side minimongo does not support yet 
	    Meteor.users.update(
		{
		    _id: user._id,
		    "posts._id": postId
		}, 
		{
		    $set: {
			"posts.$.favorite": true
		    }
		}
	    );
	    return;
	}  
	else {
	    //update the post in the users post list by marking favorite as false
	    Meteor.users.update(
                {
                    _id: user._id,
                    "posts._id": postId
                },
                {
                    $set: {
                        "posts.$.favorite": false
                    }
                }
	    );
	    return;
	}
    },

   read: function(postId) {
        //three states
        //0 - post isn't in the users post
        //1 - the post is in the users post and read = false
        //2 - the post is in the users post and read = true

       var user = Meteor.user();
       
       // ensure the user is logged in
       if (!user)
	   throw new Meteor.Error(401, "You need to login first!");
       
       var inUserPosts = false;
       var read = false;

       
       if (user.posts){
           for (var i=0; i<user.posts.length; i++) {
               if (user.posts[i]._id == postId) {
                   inUserPosts = true;
		   
                   if (user.posts[i].read)
                        read = true;
                   break;
               }
           }
       }
       
       //state 0
       if  (!inUserPosts) {
           //add the post to the users post list and mark read as true
           var post = {
               _id: postId,
               read: true,
               favorite: false,
               dates: []
           };
           Meteor.users.update(
               user._id,
               {
                   $push: {
                       posts: post
                   }
               }
           );
           return;
       }
       
       // state 1
       else if (!read) {
	   
           //update the post in the users post list by marking read as true
           //note: positional update on works on server with regular mongodb, client side minimongo does not support yet
           Meteor.users.update(
               {
                   _id: user._id,
                   "posts._id": postId
               },
               {
                   $set: {
                       "posts.$.read": true
                   }
               }
           );
           return;
       }
       else {
           //update the post in the users post list by marking read as false
           Meteor.users.update(
               {
                   _id: user._id,
                   "posts._id": postId
               },
               {
                   $set: {
                       "posts.$.read": false
                   }
               }
           );
           return;
       }
   },
    
    
    procrastigaining: function() {
	var user = Meteor.user();
	
	// ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to do this");


	//get all of the posts already read or favorited by the user so they can be queried
        var postsRead = [];
        var postsFavorite = [];

	if (user.posts){
	    for (var i=0; i<user.posts.length; i++) {
		if (user.posts[i].read == true)
                    postsRead.push(user.posts[i]._id);
		if (user.posts[i].favorite == true)
                    postsFavorite.push(user.posts[i]._id);
            }
	}


	 //find a post that is in the user's favorites but hasn't been read
        var post = Posts.findOne({ $and: [ {_id: {$nin: postsRead} }, {_id: {$in: postsFavorite } } ] }, {$sort: {votes: -1, submitted: 1}} );
	
        // if there aren't any posts left that match the user's favorites, find one that matches the user's tags
        if (!post)
            var post = Posts.findOne({ $and: [ {_id: { $nin: postsRead } },{tags: { $in: user.tags } } ] },{$sort: {votes: -1, submitted: 1}});
	
        // if there aren't any posts that match the user's tags, then find any post that the user hasn't read
        if (!post)
            var post = Posts.findOne({_id: { $nin: postsRead } }, {$sort: {votes: -1, submitted: 1} } );
	

        if (!post)
            throw new Meteor.Error(422, "You've read all of the posts. Submit a new one!");
	

	
	
	return post._id;
    }
    
});
