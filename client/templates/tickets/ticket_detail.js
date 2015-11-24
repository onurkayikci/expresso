
Template.ticketDetail.helpers({
  ownTicket: function() {
    return this.ticketAssigned == Meteor.userId();
  },
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
  },
  ticketAssignedUser: function() {
    if(this.ticketAssigned != null && typeof this.ticketAssigned != undefined){
      var userId = this.ticketAssigned;
      return _getUserName(userId);
    }
  },
  ticketAssignedToMe: function() {
    if(this.ticketAssigned != null && typeof this.ticketAssigned != undefined){
      if(this.ticketAssigned == Meteor.userId()){
        //    Session.set("CodeReadOnly", false);
        return true;
      }
    }
    else{
      //  Session.set("CodeReadOnly", true);
      return false;
    }



  }
  /*,
  ticketWatcherUsers: function() {
    if(this.ticketWatchers != null && typeof this.ticketWatchers != undefined){
      var watchers = new String();
      var watcherUsers = this.ticketWatchers;
      console.log(JSON.stringify(watcherUsers));
      watcherUsers.forEach(function(watcherUser){
        watchers = watchers + Meteor.promise('getUserName', watcherUser);
        });

      console.log(JSON.stringify(watchers));
      return watchers;
    }
  } */
});

Template.istufe_selecter.rendered = function() {

  $('#ticketTargetIStufe').selectize({
    plugins: ['remove_button'],
    delimiter: ',',
    persist: false,
    create: function(input) {
      return {
        value: input,
        text: input
      }
    }
  });


}


Template.block_code.rendered = function() {

  var editor = CodeMirror.fromTextArea(this.find("#myTextarea"), {
    lineNumbers: true,
    mode: "javascript",
    lineWrapping: true,
    theme: "default",
    readOnly: false
    //matchBrackets: true// set any of supported language modes here
  });

  //$('#accordion').collapse("hide");
}


Template.ticketDetail.events({
  'click .assignToMe': function(e) {
    e.preventDefault();
    Meteor.call('assignToMe', this._id);
  },
  'keydown #ticketTargetRelease' : function(e){
    if (e.which === 13) {
      e.preventDefault();
    }
  },
  'keydown #ticketTargetIStufe' : function(e){
    if (e.which === 13) {
      e.preventDefault();
    }
  },
  'submit .requestChange': function(e,template) {
    e.preventDefault();

    var $selectedIStufe = $('#ticketTargetIStufe').selectize();
    var targetRelease = template.find('[name=ticketTargetRelease]').value;

    //Update first the ticket ------------------------------------
    this.ticketEffect.forEach(function(eff){
      var funcName = eff.function;
      eff.matchedVariants.forEach(function(variant){
        var variantName = variant.variant;
        var nameTag = '[name=' + funcName + variantName + template.data.ticketBaureihenverbund + ']';
        var temp = template.find(nameTag).value;
        variant.code = template.find(nameTag).value;

        console.log("Code found: " + temp);

      });
      eff.dependentVariants.forEach(function(variant){
        var variantName = variant.variant;
        var nameTag = '[name=' + funcName + variantName + template.data.ticketBaureihenverbund + ']';
        variant.code = template.find(nameTag).value;
      });
    });

    var ticket = _.extend( this, {
      ticketTargetIStufe: $selectedIStufe[0].selectize.items,
      ticketTargetRelease: targetRelease
    });

    Meteor.call('updateTicket', ticket , function(error, result){ // display the error to the user and abort
      if (error)
        throwError(error.reason); //helpers->errors.js
      else
        throwSuccess("Ticket successfully updated");
    });

    //Ticket was successfully updated-------------------------


    //Update all relevant CAF Data ---------------------


    var trunk = CAF.findOne({steuergeraet_id: this.ticketComponentId, i_stufe: this.ticketiStufe, trunk: true });  // first upsert current caf

    CAF.update( trunk._id, {$set: {trunk: false} }, function(error){
      if(error)
        throw new Meteor.Error(error);
    });

    trunk._id = new Meteor.Collection.ObjectID().valueOf();
    trunk.release = targetRelease;
    trunk.version = trunk.version + 1 ;
    trunk.date = new Date();
    trunk.changed_by = Meteor.userId();
    trunk.ticketId = this._id;
    trunk.functions.forEach(function(fun){
      fun.parameters.forEach(function(param){
        var nameTag = '[name=' + fun.name + param.name + template.data.ticketBaureihenverbund + ']';
        param.brv.forEach(function(brv){
          if(brv.name == template.data.ticketBaureihenverbund)
          {
            if(template.find(nameTag).value)
              brv.code = template.find(nameTag).value;
            _logClient(brv.name + ": " + brv.code);
          }
        });
      });
    });

    Meteor.call('insertCAF', trunk, function(error, result){ // display the error to the user and abort
      if (error)
        throwError(error.reason); //helpers->errors.js
      else
        throwSuccess("CAF successfully integrated");

    });
    //CAF Data was successfully updated -----------------

    ticket.ticketTargetIStufe.forEach(function(stufe){
      var trunkOtherIStufe = CAF.findOne({steuergeraet_id: template.data.ticketComponentId, i_stufe: stufe, trunk: true });
      if(trunkOtherIStufe != null && typeof trunkOtherIStufe != undefined){
        _logClient("Incrementing caf i-stufe: " + stufe);
        CAF.update( trunkOtherIStufe._id, {$set: {trunk: false} }, function(error){
          if(error)
            throw new Meteor.Error(error);
        });
        trunk.version = trunkOtherIStufe.version + 1;
      }
      else{
        trunk.version = 1;

      }
      trunk._id = new Meteor.Collection.ObjectID().valueOf();
      trunk.i_stufe = stufe;
      trunk.trunk = true;
      Meteor.call('insertCAF', trunk, function(error, result){ // display the error to the user and abort
        if (error)
          throwError(error.reason); //helpers->errors.js
        else
          throwSuccess("CAF successfully integrated to i-Stufe: " + stufe );

      });
    });


  }

});


