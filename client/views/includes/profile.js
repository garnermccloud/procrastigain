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
    procrastigained: function() {
	time = Meteor.user().procrastigained;
	hours =  parseInt(time / 3600);
	minutes = parseInt(time / 60) - hours*60;
        seconds = parseInt(time % 60);
	return hours + " hours, " + minutes + " minutes, and " + seconds + " seconds";
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
	return tagsToLinks(Meteor.user().tags);
    }
});
			 
			 
			 
