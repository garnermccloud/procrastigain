Template.completedTasksList.helpers({
  tasks: function() {
      return Tasks.find({duration: 0}, {sort: {dateDue: 1}});
  }

});
