Template.tasksList.helpers({
  tasks: function() {
      tasks =  Tasks.find({duration: {$gt: 0}}, {sort: {dateDue: 1}});
      if (tasks.count() == 0) return false;
      else return tasks;
  },

});
