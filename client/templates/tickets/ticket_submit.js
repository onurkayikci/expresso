Template.ticketSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var ticket = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };


    Meteor.call('ticketInsert', ticket, function(error, result) {  //this is a callback
      // display the error to the user and abort
      if (error)
       /* return alert(error.reason); */
        return throwError(error.reason); //helpers->errors.js

       // show this result but route anyway
      if (result.ticketExists)
       /* alert('This link has already been posted');  */
        throwError('This link has already been posted'); //helpers->errors.js

      Router.go('ticketPage', {_id: result._id});
    });

  }
});