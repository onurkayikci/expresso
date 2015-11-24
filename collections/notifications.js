Notifications = new Mongo.Collection('notifications');

/*Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
}); */

createChangeNotification = function(comment) {
  var ticket = Tickets.findOne(comment.ticketId);
  if (comment.userId !== ticket.userId) {
    Notifications.insert({
      userId: ticket.userId,
      ticketId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};


createCommentNotification = function(comment) {
  var ticket = Tickets.findOne(comment.ticketId);
  if (_.contains(ticket.ticketWatchers, comment.userId )) {
    ticket.ticketWatchers.forEach(function(watcherId){
      console.log("notification created");
      Notifications.insert({
        userId: watcherId,
        ticketId: ticket._id,
        commentId: comment._id,
        commenterName: comment.author,
        read: false
      });
    });

  }
};