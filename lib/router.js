Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    /*return [Meteor.subscribe('posts'), Meteor.subscribe('comments')]; */
    /*return Meteor.subscribe('posts'); */
    console.log("subscribed to caf");
    return [Meteor.subscribe('caf'), Meteor.subscribe('vrm'), Meteor.subscribe('components'), Meteor.subscribe('tickets'), Meteor.subscribe('notifications')];
  }
});


Router.route('/', {name: 'myTickets'});

Router.route('/submit', {name: 'ticketSubmit'});

Router.route('/tickets/:_id', {
  name: 'ticketPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() { return Tickets.findOne(this.params._id); }
});

Router.route('/tickets/:_id/edit', {
  name: 'ticketEdit',
  data: function() { return Tickets.findOne(this.params._id); }
});

Router.route('/mycomponents', function () {
  this.render('block_view');
}); 

Router.route('/myprofile', function () {
  this.render('profile_form', {
  data: function() {
    console.log('profile rendering');
    var profile = {
      address: Meteor.user().emails[0].address,
      first_name : Meteor.user().profile.first_name,
      last_name: Meteor.user().profile.last_name
    };
    return profile;
    }
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'block_view'});