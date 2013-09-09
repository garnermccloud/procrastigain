Template.working.helpers({
  currentTask: function() {
    return Tasks.findOne(Session.get('currentTaskId'));
  }
});

Template.working.rendered = function() {
    var clock = $('.clock').FlipClock(25*60, {
    countdown: true 
    });
};
