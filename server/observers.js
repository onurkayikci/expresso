function notifySubscribers(message){

  var getUserNames = function (userIds){
    var userNames = new String();

    if(userIds != null && typeof userIds != 'undefined' && userIds.length > 0){
      userIds.forEach(function(userId){
        var userName = new String();
        //console.log("user ID: " + JSON.stringify(userId));
        var user = Meteor.users.findOne({ _id : userId });
        //console.log("user found: " + JSON.stringify(user));
        var userName = user.profile.first_name + " " + user.profile.last_name;
        //console.log("user NAme: " + JSON.stringify(userName));

        userNames = userNames + userName + ", ";
      });

      return userNames;

    }
    else{
      return null;
    }
  };

  var ticketId;
  var count = Tickets.find().count();

  if(message.watchers.length > 0){
    _log("notifying Subscribers");
    ticketId = Tickets.insert({
      _id: "zsg-" + count,
      ticketTitle: message.title,
      ticketBody: message.reason,
      ticketEffect: message.result,
      ticketAuthor: 'expresso',
      ticketAssigned: null,
      ticketWatcherUsernames : getUserNames(message.watchers),
      ticketWatchers: message.watchers,
      ticketDerivate: message.derivate,
      ticketiStufe: message.istufe,
      ticketRelease: message.release,
      ticketBaureihenverbund : message.baureihenverbund,
      ticketComponentId :  message.componentId,
      ticketCommentsCount: 0,
      ticketSubmitted: new Date(),
      ticketState: 'new'
    });
  }


  message.watchers.forEach(function(watcherId){

    var user = Meteor.users.findOne({ _id : watcherId });
    var email = user.emails[0].address;
    Email.send({
      from: "info@expresso.com",
      to: email,
      subject: message.title,
      text: message.reason + ". " + "Please check your ticket at http://caf.expresso.meteor.com/tickets/"+ticketId
    });

  });

}




function getCAFSubscribers(componentId, cafName){
  var subscribers;
  _log(componentId);
  var component = Components.findOne({_id : componentId});
  var cafBlocks = component.caf_blocks;

  _log(JSON.stringify(cafBlocks));

  if(cafBlocks != null && typeof cafBlocks != 'undefined' && cafBlocks.length > 0){
    _log("CAFBlock length: " + cafBlocks.length)
    for(var i=0; i<cafBlocks.length; i++) {
      var block = cafBlocks[i];
      if(block._id == cafName){
        if(block.subscribers.length > 0){
          subscribers = block.subscribers;
          _log(JSON.stringify(block.subscribers));
        }
        else
          return null;
      }
    }
  }

  _log("getCAFSubscribers: " + JSON.stringify(subscribers));
  return subscribers;

}



function validateTypeInhalt(componentId, baureihenverbund, derivate, iStufe, sa, reason){

  var exp = sa.slice(1, (sa.length - 1));
  _log("Reg Expression: " + exp);
  var rex = new RegExp(exp);

  var trunk = CAF.find({steuergeraet_id: componentId, "functions.parameters.brv.code": rex, i_stufe: iStufe,  trunk: true });
  _log("validateTypeInhalt trunk count: " + trunk.count());

  if(trunk.count() > 0){
    trunk.forEach(function (caf){
      var message = {
        title : sa + " has changed by " + derivate,
        reason : reason,
        componentId : componentId,
        cafId : caf._id,
        block : caf.name,
        sa : sa,
        istufe : iStufe,
        release : caf.release,
        baureihenverbund : baureihenverbund,
        derivate: derivate,
        watchers: getCAFSubscribers(componentId, caf.name),
        result : new Array(),
      };

      caf.functions.forEach(function (func){
        var isMatch = false;
        var matchedFunction = {
          function : func.name,
          matchedVariants : new Array(),
          dependentVariants : new Array()
        };

        func.parameters.forEach(function(param){

          param.brv.forEach(function(brv){
            var code = brv.code;
            //  _log(brv.name + ": " + rex.test(code) + "baureihenverbund: " + baureihenverbund);
            if(rex.test(code) && brv.name == baureihenverbund){
              isMatch = true;
              var matchedVariant = {
                variant : param.name,
                brv : brv.name,
                code : brv.code
              };
              _log("match: " + JSON.stringify(matchedVariant));
              matchedFunction.matchedVariants.push(matchedVariant);
            }
            else if(brv.name == baureihenverbund){
              var dependent = {
                variant : param.name,
                brv : brv.name,
                code : brv.code
              };
              _log("dependent: " + JSON.stringify(dependent));
              matchedFunction.dependentVariants.push(dependent);

            }
          });

        });

        if(isMatch){
          //          _log(JSON.stringify(match));
          message.result.push(matchedFunction);
        }



        /*   func.parameters.forEach(function(param){

          param.brv.forEach(function(brv){
            var code = brv.code;
            //  _log(brv.name + ": " + rex.test(code) + "baureihenverbund: " + baureihenverbund);
            if(rex.test(code) && brv.name == baureihenverbund){
              var match = {
                function : func.name,
                variant : param.name,
                brv: brv.name,
                code : brv.code
              };
              _log(JSON.stringify(match));
              message.result.push(match);
            }
          });

        }); */

      });

      if(message.result.length > 0){
        _log("validateTypeInhalt message: " + JSON.stringify(message));
        notifySubscribers(message);
      }


    });
  }

}

VRM.find().observe({
  // added: function(document){},
  addedAt : function(document, atIndex, before){},
  // changed : function (newDocument, oldDocument){},
  changedAt: function (newDocument, oldDocument, atIndex){
    _log('Changed Document: ' + atIndex);

    var delta = jsondiffpatch.diff(newDocument, oldDocument);
    var deltaArray = _.pairs(delta);
    _log(JSON.stringify(_.pairs(delta) ));
    var reason = new Array();
    if(oldDocument.Art == "SA"){
      deltaArray.forEach(function(row){
        var key= row[0];
        var value = row[1];
        _log(key + " " + value);

        reason.push(oldDocument.Dann_Teil + " -" + oldDocument.Benennung + "- " + "is changed from " + value[1] + " to " + value[0] + " for the derivate " + oldDocument.derivate + " and type " + key + ".");
      });
      validateTypeInhalt(newDocument.steuergeraet_id, newDocument.baureihenverbund, newDocument.derivate, newDocument.iStufe, newDocument.Dann_Teil, reason);

    }
  },
  //  removed: function (oldDocument){},
  removedAt : function(oldDocument, atIndex){},
  movedTo : function(document, fromIndex, toIndex, before){}
});

/*
VRM.find().observeChanges({
    added: function (document) {
        // Do something to collection 2
    },
    changed: function (id, fields) {
      _log('Changed Fields: ' + id);
      var vrm = VRM.findOne({_id:id});
      var componentId = vrm.steuergeraet_id;
    //  var subscribed_users = Meteor.users.find({ 'profile.components' : componentId });
      _log('Changed Fields: ' + JSON.stringify(fields));
      var changedFields = _.pairs(fields);
      var watchers = new Array();
      var title = 'VRM: ' + vrm.derivate + ' has changed';
      _log('Changed Fields: ' + JSON.stringify(changedFields));

      changedFields.forEach(function(field){
        var key = _.first(field);
        var value = _.second(field);

      });
      validateTypeInhalt(componentId, vrm.baureihenverbund, vrm.derivate, vrm.iStufe, "S4NBA");

  /*    subscribed_users.forEach(function(user){
        watchers.push(user._id);
        console.log('pushed watcher: ' +  user._id);
      });
      console.log("watchers: "+ JSON.stringify(watchers));
      var title = 'VRM: ' + vrm.derivate + ' has changed';
      console.log('title: ' + title);

      var ticketId = Tickets.insert({
          title: title,
          author: 'expresso',
          watchers: watchers,
          derivate: vrm.derivate,
          iStufe: vrm.iStufe,
          changedFields: changed,
          commentsCount: 0,
          submitted: new Date(),
          state: 'new'
      });
      console.log('ticket entered: ' +  ticketId);

      subscribed_users.forEach(function(user){
        var notificationId = Notifications.insert({
          ticketId : ticketId,
          userId: user._id,
          derivate: vrm.derivate,
          iStufe: vrm.iStufe,
          changedFields: fields,
          read: false
        });
        console.log('notification entered: ' +  notificationId);
      }); */



/*var subscribtions = Subscribtions.findOne({derivate: drv});
      var subs = subscribtions.subcribers;
      for(var i=0; i<subs.length; i++) {
        Notifications.insert({
          userId: subs.userId,
          derivate: drv,
          iStufe: vrm.iStufe,
          changedFields: fields,
          read: false
        });
      }  //obsolete
    },
    removed: function (oldDocument) {
        // ...
    }
}); */
