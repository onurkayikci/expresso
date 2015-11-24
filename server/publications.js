Meteor.publish('caf', function() {
  return CAF.find();
});


Meteor.publish('cafBlocks', function(){
  return CAF.find({name: 'AirConditioning', steuergeraet_id:'BDC2015', version: 12});
  
});

Meteor.publish('components', function() {
  return Components.find();
});

Meteor.publish('tickets', function() {
  return Tickets.find();
});

Meteor.publish('comments', function(ticketId) {
  check(ticketId, String);
  return Comments.find({ticketId: ticketId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('vrm', function() {
  return VRM.find();
});
