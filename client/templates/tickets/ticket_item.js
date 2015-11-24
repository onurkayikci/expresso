Template.ticketItem.helpers({
  ownTicket: function() {
    return this.ticketAssigned == Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },/*,
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }*/
  labelState: function() {
      switch(this.ticketState) {
        case 'new':
          return 'label label-danger';
        case 'in progress':
          return 'label label-warning';
        case 'closed':
          return 'label label-default';
        case 'resolved':
          return 'label label-success';
        default:
          return 'label label-danger';
      }
  }
});

Template.ticketItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});