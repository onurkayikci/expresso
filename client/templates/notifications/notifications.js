Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
  	return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationTicketPath: function() {
    return Router.routes.ticketPage.path({_id: this.ticketId});
  }
})

Template.notificationItem.events({
  'click a': function() {
    console.log("updating notificatioon");
    Notifications.update( {_id: this._id}, {$set: {read: true}});
  }
})