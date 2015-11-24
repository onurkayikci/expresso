CAF = new Mongo.Collection('caf');  // This means it is available to both the server and the client – and it will run on both at the same time!

CAF.allow({
  insert: function(userId, caf) {
    // only allow posting if you are logged in
    return !! userId;
  },
  update: function(userId, caf) { return true; },
  remove: function(userId, caf) { return ownsDocument(userId, caf); },
});


Meteor.methods({
  insertCAF: function(trunk){
  //  var trunk = CAF.update( {_id: trunk._id}, trunk, { upsert: true });
    var trunk = CAF.insert( trunk );
  }
});