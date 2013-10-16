Template.allTasksList.helpers({
    options: function() {
	return {
	    options: {duration: {$gt: 0}}
	}
    }
});

Template.todayTasksList.helpers({
    options: function() {
        return {
            options: {$and: [ {duration: {$gt: 0}}, {dateDue: {$lt: moment().add('days',1).startOf('day')._d} } ] }
        }
    }
});

 
Template.threeDaysTasksList.helpers({
    options: function() {
        return {
            options: {$and: [ {duration: {$gt: 0}}, {dateDue: {$lt: moment().add('days',3).startOf('day')._d} } ] }
        }
    }
});



Template.sevenDaysTasksList.helpers({
    options: function() {
        return {
           options: {$and: [ {duration: {$gt: 0}}, {dateDue: {$lt: moment().add('days',7).startOf('day')._d} } ] }
        }
    }
});








Template.tasksList.helpers({
    tasks: function() {
	tasks =  Tasks.find(this.options, {sort: {dateDue: 1}});
	if (tasks.count() == 0) return false;
	else return tasks;
    },
    dateHolder: function() {
	return moment().add('days', 7).format("YYYY-MM-DD");
    },
    activeRouteClass: function(/* route names */) {
	
	var args = Array.prototype.slice.call(arguments, 0);
	args.pop();
	
	var active = _.any(args, function(name) {
            return location.pathname === Router.path(name);
	});
	
	return active && 'active';
    },
    
});


Template.tasksList.events({
    'submit form': function(e) {
        e.preventDefault();

        //get duration in seconds
        var duration =  $(e.target).find('[name=duration-hours]').val()*3600 +
            $(e.target).find('[name=duration-minutes]').val()*60;

        //create proposed task from inputs
        var task = {
            title: $(e.target).find('[name=title]').val(),
            duration: duration,
            appeal: $(e.target).find('[name=appeal]').val(),
            dateDue: new Date($(e.target).find('[name=dateDue]').val().replace(/-/g, "/"))
            }

        Meteor.call('task', task, function(error, id) {
            if (error) {
                throwError(error.reason);
            }
            else {
		task._id = id;
		document.getElementById("submitForm").reset();
		Router.go('allTasksList');
            }
        });
    }
});
