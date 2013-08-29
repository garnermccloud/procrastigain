Tasks = new Meteor.Collection('tasks');


Tasks.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Tasks.deny({
  update: function(userId, task, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title', 'dateDue').length > 0);
  }
});

Meteor.methods({
  task: function(taskAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to add tasks!");

    // ensure the task has a title
    if (!taskAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title for your task');

      // ensure the task has a due date
      if (!taskAttributes.dateDue)
	  throw new Meteor.Error(422, 'Please fill in a due date');
    
      // ensure the task has a duration
      if (taskAttributes.duration == 0)
	  throw new Meteor.Error(422, 'Please fill in length of task');

    // pick out the whitelisted keys
    var task = _.extend(_.pick(taskAttributes, 'title', 'dateDue', 'duration', 'appeal'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime()
    });

    var taskId = Tasks.insert(task);

    return taskId;
  },

    taskEdit: function(taskAttributes, id) {
	var user = Meteor.user(),
	taskId = id;
	
	
        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to edit tasks");

        // ensure the task has a title
        if (!taskAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a title');
	
	
	// ensure the task has a due date
	if (!taskAttributes.dateDue)
            throw new Meteor.Error(422, 'Please fill in a due date');
	
	// ensure the task has a duration
	if (taskAttributes.duration == 0)
            throw new Meteor.Error(422, 'Please fill in length of task');
	
	
	// pick out the whitelisted keys
        Tasks.update(taskId, {$set: taskAttributes}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {

            }
        });
	
	return taskId;
    }

});
