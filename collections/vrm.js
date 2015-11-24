VRM = new Mongo.Collection('vrm');  // This means it is available to both the server and the client – and it will run on both at the same time!

VRM.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});