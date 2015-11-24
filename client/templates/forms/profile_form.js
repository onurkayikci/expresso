Template.component_selecter.rendered = function (){

  $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 'auto'
  });

  $('.sl-all').click(function() {
      $('.selectpicker').selectpicker('selectAll');
  });

};

Template.profile_form.events({
  'submit form': function(e) {
    e.preventDefault();

    var profile = {
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      components: $(e.target).find('.selectpicker').val()
    }

    if(profile.components != null && profile.components.length > 0 && typeof profile.components != undefined  ){

          profile.components.forEach(function(comp){
            var componentProporties = s.words(comp, "_");  //splices string to two words

            var subscribtionAttributes = {
              componentId : componentProporties[0],
              cafBlockId : componentProporties[1]
            };

            Meteor.call('updateSubscribers', subscribtionAttributes, function(error) {
              if (error){
                throwError(error.reason);
              } else {
                _logClient("Subscriber is added " );
              }
            });
          });

    }

    
    _logClient(JSON.stringify(profile));

    Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile': profile }}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);  //helpers->errors.js
      } else {
        throwSuccess("Profile successfully updated");
     //   Router.go('postPage', {_id: currentPostId});
      }
    });
  }
});