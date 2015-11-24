Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      ticketId: String,
      body: String
    });

    var user = Meteor.user();
    var ticket = Tickets.findOne(commentAttributes.ticketId);

    if (!ticket)
      throw new Meteor.Error('invalid-comment', 'You must comment on a ticket');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.profile.first_name + " " + user.profile.last_name,
      submitted: new Date()
    });

    // update the post with the number of comments
    Tickets.update(comment.ticketId, {$inc: {ticketCommentsCount: 1}});

     // create the comment, save the id
    comment._id = Comments.insert(comment);

    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);

    return comment._id;
  }
});