Template.taskPage.helpers({
  currentTask: function() {
    return Tasks.findOne(Session.get('currentTaskId'));
  }
});
