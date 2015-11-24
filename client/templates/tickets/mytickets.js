Template.myTickets.helpers({
  tickets: function() {
    //return Posts.find();
    return Tickets.find({ 'ticketWatchers' : Meteor.userId() }, {sort: {submitted: -1}});
  }
});