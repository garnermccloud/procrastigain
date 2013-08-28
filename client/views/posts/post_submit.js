Template.postSubmit.events({
    'submit form': function(e) {
	e.preventDefault();
	
	var post = {
	    url: $(e.target).find('[name=url]').val(),
	    title: $(e.target).find('[name=title]').val(),
	    message: $(e.target).find('[name=message]').val()
	}
	Meteor.call('post', post, function(error, id) {
	    if (error) {
		// display the error to the user
		throwError(error.reason);
		// if the error is that the post already exists, take us there
		if (error.error === 302)
		    Router.go('postPage', error.details);
	    } 
	    else {
	    post._id = id;
	    Router.go('postPage', post);
	    }
	});
    }
});
