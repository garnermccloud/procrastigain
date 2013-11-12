Template.workspace.helpers({
  TasksList: function() {
      createNewTask = {
	  title: "Create New Task",
	  path: "taskSubmit",
	  task: ""
      }
	  
      var main = Tasks.findOne({duration: {$gt: 0}}, {sort: {dateDue: 1, duration: -1, appeal: 1}});
      if (!!main) {
	  main.path = "working";
	  main.task = {_id: main._id};
	  
	  var alt1 = Tasks.findOne({$and: [ {_id: {$ne: main._id}},{duration: {$ne: 0}} ] }, {sort: {dateDue: 1, appeal: -1}});
	  if (!!alt1) {
	      alt1.path = "working";
	      alt1.task = {_id: alt1._id};
	      
	      var alt2 = Tasks.findOne({$and: [ {_id: {$ne: main._id}}, {_id: {$ne: alt1._id}}, {duration: {$ne: 0}} ] },
				       {sort: {dateDue: 1, appeal: -1}});
	      if (!!alt2) {
		  alt2.path = "working";
		  alt2.task = {_id: alt2._id};
	      }
	      else alt2 = createNewTask;
	  }
	  else {
	      alt1 = createNewTask
	      var alt2 = createNewTask;
	  }
      }
      else {
	  main = createNewTask;
	  var alt1 = createNewTask;
	  var alt2 = createNewTask;
      }

      var TasksList = {
	  main: main,
	  alt1: alt1,
	  alt2: alt2
      };
      return TasksList;
  },
    
    reusableApps: function() {
        reusableApps = ReusableApps.find({userId: Meteor.userId()});
	
        if (reusableApps.count() == 0) {
            return false;
        }
        else {
            return reusableApps;
        }
    }


});

Template.workspace.events({
    'click #pgWithPost': function(e) {
	e.preventDefault();
	var post;
	
	Meteor.call('procrastigaining', function(error, id) {
	    if (error)
		throwError(error.reason);
	    else {
		var post = {
		    _id: id
		};
		Router.go('procrastigaining', post);
	    }
	});
    },
    'click #pgWithApp': function(e) {
	e.preventDefault();
	var app =  {
	    '_id': $('#reusableAppsEditDropdown').val()
	};
	Router.go('procrastigainingApp', app);
    }
});
