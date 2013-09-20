

Template.postEdit.helpers({
  post: function() {
    return Posts.findOne(Session.get('currentPostId'));
  },
    tagString: function() {
	return this.tags.toString();
    }
 });

Template.postEdit.events({
    'submit form': function(e) {
	e.preventDefault();
	
	var currentPostId = Session.get('currentPostId');
	
	var postProperties = {
	    url: $(e.target).find('[name=url]').val(),
	    title: $(e.target).find('[name=title]').val()
	};

	//remove extra whitespaces and commas, then make from csv to an array
	var tags = $(e.target).find('[name=tags]').val().split(/[\s,]+/).join();
	if (tags == ",") tags = "";
	else tags = tags.split(',');
	postProperties.tags = tags;
	

	
	Meteor.call('postEdit', postProperties, currentPostId, function(error, id) {
	    if (error) {
                // display the error to the user
                throwError(error.reason);
                // if the error is that the post already exists, take us there
                if (error.error === 302)
                    Router.go('postPage', error.details);
            }
            else {

		postProperties._id = id;
		Router.go('postPage', postProperties);
	    }
	});
	
    },	
    
	
    'click .delete': function(e) {
	e.preventDefault();
	
	if (confirm("Delete this post?")) {
	    var currentPostId = Session.get('currentPostId');
	    Posts.remove(currentPostId);
	    Router.go('newPostsList');
	}
    }
    
});
			 
