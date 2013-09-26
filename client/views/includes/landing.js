Template.landing.helpers({
    existingUserLoad: function() {
	if (!!Meteor.user()) Router.go('workspace');
	return "";
    }
});
