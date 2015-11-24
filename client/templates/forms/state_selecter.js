Template.state_selecter.helpers({
  stateOptions: function(){
        var options = [
          {
          state_class: 'label label-success',
          _id: 'new',
          state:'new'
          },
          {
          state_class: 'in-progress-state',
          _id: 'in progress',
          state:'in progress'
          },
          {
          state_class: 'resolved-state',
          _id: 'resolved',
          state:'resolved'
          },
          {
          state_class: 'closed-state',
          _id: 'closed',
          state:'closed'
          },

                      ];
        return options;
  }
      //};
     // console.log('profile:' + JSON.stringify(profile));
   //   return profile;
});


Template.state_selecter.rendered = function (){

  $('.statepicker').selectpicker({
      size: 4,
      width: 150
  });


};