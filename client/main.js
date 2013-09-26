
Deps.autorun(function(){
    if (Meteor.user() && !Meteor.loggingIn()) {
	Meteor.call('getHash', Meteor.user().emails[0].address, function(error, result){
	    Session.set('userEmailHash', result);
	});
	if(Session.get('userEmailHash')){
	    var intercomSettings = {
		email: Meteor.user().emails[0].address,
		created_at: Math.round(Meteor.user().createdAt/1000),
		user_name: Meteor.user().username,
		user_hash: Session.get('userEmailHash'),
		widget: {
		    activator: '#Intercom',
		    use_counter: true
		},
		app_id: "bbfaf894a517e143ec4a01d02f03006fa2025d53"
	    };
	    Intercom('boot', intercomSettings);
	}
    }
});


if (typeof clock != "undefined") clock.clear(); 



Template.main.rendered = function() {
if (typeof amplify.store("introComplete") == "undefined") amplify.store("introComplete", false);
    intro = introJs();
    intro.setOptions({
	steps: [
             {
                element: document.getElementById('brand'),
                intro: "Welcome to Procrastigain! </br></br>Let's get started.",
                position: 'right'
            },
	    {
		element: document.getElementById('tasksList'),
		intro: "Procrastigain keeps track of everything need to do."
		position:'right'
		
            },
            {
		element: document.getElementById('personalTrainer'),
		intro: "Ok, wasn't that fun?",
		position: 'right'
            },
            {
		element: document.getElementById('posts'),
		intro: 'More features, more fun.',
		position: 'left'
            }
	]
    });
    
    //Make sure that the user is logged in before the tour starts
    if (!amplify.store("introComplete") && !!Meteor.user()) intro.start();

    intro.onexit(function() {
	amplify.store("introComplete",true);
    });

    intro.oncomplete(function() {
        amplify.store("introComplete",true);
    });
};
