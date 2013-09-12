Template.workspace.helpers({
  TasksList: function() {
      createNewTask = {
	  title: "Create New Task",
	  path: "taskSubmit",
	  task: ""
      }
	  
      var main = Tasks.findOne({}, {sort: {dateDue: 1, duration: -1, appeal: 1}});
      if (!!main) {
	  main.path = "working";
	  main.task = {_id: main._id};
	  
	  var alt1 = Tasks.findOne({_id: {$ne: main._id}}, {sort: {dateDue: 1, appeal: -1}});
	  if (!!alt1) {
	      alt1.path = "working";
	      alt1.task = {_id: alt1._id};
	      
	      var alt2 = Tasks.findOne({$and: [ {_id: {$ne: main._id}}, {_id: {$ne: alt1._id}} ] },
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
  }

});

Template.workspace.events({
    'click .btn-pg-active': function(e) {
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
    }
});
