Template.ticketPage.helpers({
  comments: function() {
    return Comments.find({ticketId: this._id});
  }
});