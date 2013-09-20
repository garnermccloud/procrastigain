Template.newPostsList.helpers({
  options: function() {
    return {
	sort: {submitted: -1},
	handle: newPostsHandle
    }
  }
});
Template.bestPostsList.helpers({
    options: function() {
	return {
	    sort: {votes: -1, submitted: -1},
	    handle: bestPostsHandle
	}
    }
});

Template.submittedPostsList.helpers({
    options: function() {
	return {
	    userId: Meteor.userId(),
	    sort: {votes: -1, submitted: -1},
	    handle: bestPostsHandle
	}
    }
});


Template.taggedPostsList.helpers({
    options: function() {
	return {
	    sort: {votes: -1, submitted: -1},
            handle: bestPostsHandle,
	    tag: this._id
        }
    }
});



Template.postsList.helpers({
    
    postsWithRank: function() {
	var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
	
	//pass the user submitted posts if there is a userId
	if (!!this.userId)
	    var posts = Posts.find({userId: this.userId}, options);
	
	//pass the tagged posts if there is a tag
	else if (!!this.tag)
	    var posts = Posts.find({tags: this.tag}, options);
	
	//pass all posts otherwise
	else
	    var posts = Posts.find({}, options);

	return posts.map(function(post) {
	    post._rank = i;
	    i += 1;
	    return post;
	});
    },
    
    posts: function() {
	var options = {sort: this.sort, limit: this.handle.limit()};
        if (!this.userId)
            return posts = Posts.find({}, options);
        else return Posts.find({userId: this.userId}, options);
    },
    postsReady: function() {
	return this.handle.ready();
    },
    allPostsLoaded: function() {
	return this.handle.ready() && 
	    Posts.find().count() < this.handle.loaded();
    }
});

Template.postsList.events({
    'click .load-more': function(e) {
	e.preventDefault();
	this.handle.loadNextPage();
    }
});
