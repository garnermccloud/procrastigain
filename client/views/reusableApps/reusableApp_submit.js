Template.reusableAppSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var reusableApp = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('reusableApp', reusableApp, function(error, id) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            }
            else {
                Router.go('profile');
            }
        });
    }
});
