Template.header.helpers({
  activeRouteClass: function(/* route names */) {

    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();    

    var active = _.any(args, function(name) {
	return location.pathname === Router.path(name);
    });

    return active && 'active';
  }
});

Template.header.events({
 'click #tour': function(e) {
     e.preventDefault();
     amplify.store("introComplete", false);
     intro.start();
 }
});
