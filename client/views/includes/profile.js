Template.profile.helpers({
    profileName: function() {
	return Meteor.user().username + "'s Profile";
    },
    karma: function() {
	var posts = Posts.find({userId: Meteor.userId()});
	var karma = 0;
	posts.forEach( function(post) {
	    karma = karma + post.votes;
	});
	return karma;
    },
    creationDate: function() {
	var d = new Date(Meteor.user().createdAt);
	return d.toDateString();
    },
    interests: function() {
	var tags = Meteor.user().tags;
	var interests = "";
	tags.forEach( function(tag) {
	    interests = interests + tag + ", ";
	});
	
	// if there are interests, cut off the extra space and comma
	var length = interests.length;
	if (length > 0) {
	    interests = interests.slice(0, length - 2);
	}
	return interests;
    }
});
			 
			 
			 
