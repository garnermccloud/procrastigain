Template.landing.helpers({
    existingUserLoad: function() {
	if (!!Meteor.user()) Router.go('workspace');
	return "";
    }
});


Template.landing.events({
    'click .gLogin': function(e) {
	e.preventDefault();
	Meteor.loginWithGoogle({requestPermissions: ['email']}, function(error) {
	    if (error) {
		throwError('Error logging in with Google');
	    }
	});
    },

    'click .fbLogin': function(e) {
        e.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['email']}, function(error) {
            if (error) {
                throwError('Error logging in with Facebook');
            }
        });
    },

    'submit #topForm': function(e, t) {
	e.preventDefault();
	var username = t.find('#username1').value;
	var email = t.find('#email1').value;
	var password = t.find('#password1').value;
	
	//username validation
	var validateUsername = function(username) {
	    
	    if (username.length >= 3 && username.length <= 20) {
		return true;
	    }
	    else if (username.length > 20) {
		throwError("Username cannot be greater than 20 characters long");
		return false;
	    }
	    else {
		throwError("Username must be at least 3 characters long");
		return false;
	    }
	};
	
	var validateEmail = function(email) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	    if (re.test(email)) {
		return true;
	    } else {
		throwError("Invalid email");
		return false;
	    }
	};
	
	var validatePassword = function(password) {
	    if (password.length >= 6) {
		return true;
	    } else {
		throwError("Password must be at least 6 characters long");
		return false;
	    }
	};
	
	if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
	    Accounts.createUser({username: username, email: email, password : password}, function(error){
		if (error) {
		    throwError(error.reason);
		}
	    });
	}
        //return false; 
    },

    'submit #bottomForm': function(e, t) {
        e.preventDefault();
        var username = t.find('#username2').value;
        var email = t.find('#email2').value;
        var password = t.find('#password2').value;
	
        //username validation
        var validateUsername = function(username) {
	    
            if (username.length >= 3 && username.length <= 20) {
                return true;
            }
            else if (username.length > 20) {
                throwError("Username cannot be greater than 20 characters long");
                return false;
            }
            else {
                throwError("Username must be at least 3 characters long");
                return false;
            }
        };
	
        var validateEmail = function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
            if (re.test(email)) {
                return true;
            } else {
                throwError("Invalid email");
                return false;
            }
        };
	
        var validatePassword = function(password) {
            if (password.length >= 6) {
                return true;
            } else {
                throwError("Password must be at least 6 characters long");
                return false;
            }
        };
	
        if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
            Accounts.createUser({username: username, email: email, password : password}, function(error){
                if (error) {
                    throwError(error.reason);
                }
            });
        }
        //return false;
    }

});
