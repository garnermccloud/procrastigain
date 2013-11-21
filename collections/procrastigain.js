
Meteor.methods({
    doneProcrastigaining: function(prevId, favorite, startDate, endDate) {
        var user = Meteor.user();

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login first!");

        if (!prevId)
             throw new Meteor.Error(422, "Error with retrieving postId");

        // create post object to be added to user's post
        var post = {
            _id: prevId,
            read: true,
            favorite: favorite,
            dates: [startDate, endDate]
        };
        var inUserPosts = false;

        //if post is already in user's post list, then update the fields of that post
        if (user.posts){
            for (var i=0; i<user.posts.length; i++) {
                if (user.posts[i]._id == post._id) {
                    inUserPosts = true;
                    Meteor.users.update({_id: user._id, "posts._id": post._id}, {$set: {"posts.$.read": post.read, "posts.$.favorite": post.favorite}, $push: {"posts.$.dates": post.dates}}, function(error) {
                        if (error) {
                            // display the error to the user
                            //alert(error.reason);
                        }
                    });
                    break;
                }
            }
        }

        //if post isn't in user's post list, then add it to the list
        if (!inUserPosts) {
            // embed post dates as a single element date couple
            post.dates = [post.dates];

            Meteor.users.update(user._id, { $push: {posts: post} }, function(error) {
                if (error) {
                    // display the error to the user
                    //alert(error.reason);
                }
            });
        }

    },
    
    //user clicked next post so add the post to the users already read field and return a new post for them to read
    nextPost: function(prevId, favorite, startDate, endDate) {
	var user = Meteor.user();
	
	// ensure the user is logged in
	if (!user)
	    throw new Meteor.Error(401, "You need to login first!");

	if (!prevId)
	     throw new Meteor.Error(422, "Error with retrieving postId");

	// create post object to be added to user's post
	var prevPost = {
	    _id: prevId,
	    read: true,
	    favorite: favorite,
	    dates: [startDate, endDate]
	};
	var inUserPosts = false;
	
	//if post is already in user's post list, then update the fields of that post
	if (user.posts){
	    for (var i=0; i<user.posts.length; i++) {
		if (user.posts[i]._id == prevPost._id) {
		    inUserPosts = true;
		    Meteor.users.update({_id: user._id, "posts._id": prevPost._id}, {$set: {"posts.$.read": prevPost.read, "posts.$.favorite": prevPost.favorite}, $push: {"posts.$.dates": prevPost.dates}}, function(error) {
			if (error) {
			    // display the error to the user
			   // alert(error.reason);
			} 
		    });
		    break;
		}
	    }
	}

	//if post isn't in user's post list, then add it to the list	
	if (!inUserPosts) {
	    // embed post dates as a single element date couple
	    prevPost.dates = [prevPost.dates];

	    Meteor.users.update(user._id, { $push: {posts: prevPost} }, function(error) {
		if (error) {
		    // display the error to the user
		    //alert(error.reason);
                } 
	    });
	}
	
	//get all of the posts already read or favorited by the user so they can be queried
	var postsRead = [];
	var postsFavorite = [];
	user = Meteor.user();
	for (var i=0; i<user.posts.length; i++) {
	    if (user.posts[i].read == true) 
		postsRead.push(user.posts[i]._id);
	    if (user.posts[i].favorite == true)
		postsFavorite.push(user.posts[i]._id);
	}
	
	
	//find a post that is in the user's favorites but hasn't been read
        var post = Posts.findOne({ $and: [ {_id: {$nin: postsRead} }, {_id: {$in: postsFavorite } } ] }, {$sort: {votes: -1, submitted: -1}} );
	
        // if there aren't any posts left that match the user's favorites, find one that matches the user's tags
        if (!post)
	    var post = Posts.findOne({ $and: [ {_id: { $nin: postsRead } },{tags: { $in: user.tags } } ] },{$sort: {votes: -1, submitted: -1}});

	// if there aren't any posts that match the user's tags, then find any post that the user hasn't read
	if (!post)
            var post = Posts.findOne({_id: { $nin: postsRead } }, {$sort: {votes: -1, submitted: -1} } );

	
        if (!post)
	    throw new Meteor.Error(422, "You've read all of the posts. Submit a new one!");
	
	return post._id;
    }
    
});
    
