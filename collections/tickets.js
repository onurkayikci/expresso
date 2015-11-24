Tickets = new Mongo.Collection('tickets');  // This means it is available to both the server and the client – and it will run on both at the same time!

/*
Tickets.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
}); */

Tickets.allow({
  update: function(userId, ticket) { return ownsDocument(userId, ticket); },
  remove: function(userId, ticket) { return ownsDocument(userId, ticket); },
});

Tickets.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({   //server side methods
  ticketInsert: function(ticketAttributes) {
    check(Meteor.userId(), String);
    check(ticketAttributes, {
      title: String,
      url: String
    });

    var ticketWithSameLink = Tickets.findOne({url: ticketAttributes.url});
    if (ticketWithSameLink) {
      return {
        postExists: true,
        _id: ticketWithSameLink._id
      }
    }


    var user = Meteor.user();
    var ticket = _.extend(ticketAttributes, {
      //_id: "zsg-" + count,
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      state: 'new',
    });

    var ticketId = Tickets.insert(ticket);

    return {
      _id: ticketId
    };
  },
  assignToMe: function(ticketId) {
    check(this.userId, String);
    check(ticketId, String);

    var ticket = Tickets.findOne(ticketId);
    if (!ticket)
      throw new Meteor.Error('invalid', 'Ticket not found');

    if (_.include(ticket.assignToMe, this.userId))
      throw new Meteor.Error('invalid', 'Already assigned to this user');

    Tickets.update(ticket._id, {
      $set: {ticketAssigned: this.userId, ticketState: "in progress"},
    }, function(error){
      if(error)
        throw new Meteor.Error(error);
    });
  },
  updateTicket: function(ticket) {
    check(Meteor.userId(), String);

    Tickets.update(ticket._id, ticket, function(error){
      if(error)
        throw new Meteor.Error(error);
    });
  }


    //What we are saying is “find all the posts with this id that this user hasn't yet voted for, and update them in this way
    /*  var affected = Tickets.update({
      _id: ticketId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that ticket"); */




  });