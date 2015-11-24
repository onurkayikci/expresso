Template.ticketEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentTicketId = this._id;

    var ticketProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    Tickets.update(currentTicketId, {$set: ticketProperties}, function(error) {
      if (error) {
        // display the error to the user
      /*  alert(error.reason); */
        throwError(error.reason);  //helpers->errors.js
      } else {
        Router.go('ticketPage', {_id: currentTicketId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this ticket?")) {
      var currentTicketId = this._id;
      Tickets.remove(currentTicketId);
      Router.go('myTickets');
    }
  }
});