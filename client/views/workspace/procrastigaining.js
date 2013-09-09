Template.procrastigaining.helpers({
  postUrl: function() {
      var url = "http://www.smashingmagazine.com/2013/06/13/build-app-45-minutes-meteor/";
      return url;
  }
});

Template.procrastigaining.rendered = function() {
    var clock = $('.clock').FlipClock(25*60, {
    countdown: true 
    });
};
