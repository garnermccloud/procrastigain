Template.postItem.helpers({

    ownPost: function() {
	if (!Meteor.user()) return false;
	else return (this.userId == Meteor.userId() || Meteor.user().username == "admin");
    },
    
    domain: function() {
	var a = document.createElement('a');
	a.href = this.url;
	return a.hostname;
    },
    
    upvotedClass: function() {
	var userId = Meteor.userId();
	if (!userId)
            return 'disabled';
	else if (userId && !_.include(this.upvoters, userId)) {
	    return 'btn-primary upvoteable';
	} else {
	    return 'btn-link upvoteable';
	}
    },

    favoriteButton: function() {
        var user = Meteor.user();
	if (!user) 
	    return '';
	
	var postsFavorite = [];
	if (user.posts){
            for (var i=0; i<user.posts.length; i++) {
                if (user.posts[i].favorite == true)
                    postsFavorite.push(user.posts[i]._id);
            }
        }
	
        if (!_.include(postsFavorite, this._id)) {
            return '<a href="#" class="favoriteable btn-xs btn-primary">Add to favorites</a>';
        } else {
            return '<a href="#" class="favoriteable btn-xs btn-link">Remove from favorites</a>';
        }
    },

     readButton: function() {
        var user = Meteor.user();
        if (!user)
            return '';

        var postsRead = [];
        if (user.posts){
            for (var i=0; i<user.posts.length; i++) {
                if (user.posts[i].read == true)
                    postsRead.push(user.posts[i]._id);
            }
        }

        if (!_.include(postsRead, this._id)) {
            return '<a href="#" class="readable btn-xs btn-primary">Move to Read</a>';
        } else {
            return '<a href="#" class="readable btn-xs btn-link">Move to Unread</a>';
        }
    },


    
    tags: function() {
	
	return tagsToLinks(this.tags);
	    
    }
});

Template.postItem.rendered = function(){
  // animate post from previous position to new position
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var postHeight = 80;
  var newPosition = rank * postHeight;
  // if element has a currentPosition (i.e. it's not the first ever render)
  if (typeof(instance.currentPosition) !== 'undefined') {
    var previousPosition = instance.currentPosition;
    // calculate difference between old position and new position and send element there
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
  } else {
    // it's the first ever render, so hide element
    $this.addClass("invisible");
  }
  // let it draw in the old position, then..
  Meteor.defer(function() {
    instance.currentPosition = newPosition;
    // bring element back to its new original position
    $this.css("top",  "0px").removeClass("invisible");
  }); 
};

Template.postItem.events({
    'click .upvoteable': function(e) {
	e.preventDefault();
	Meteor.call('upvote', this._id);
    },
    
     'click .favoriteable': function(e) {
        e.preventDefault();
        Meteor.call('favorite', this._id);
    },

       'click .readable': function(e) {
        e.preventDefault();
        Meteor.call('read', this._id);
    },

});
