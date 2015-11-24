Components  = new Mongo.Collection('components');

Components.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});


Meteor.methods({   //server side methods
    updateSubscribers: function(subscribtionAttributes) {
      check(this.userId, String);
      check(subscribtionAttributes, {
        componentId: String,
        cafBlockId: String
      });

      Components.update({_id: subscribtionAttributes.componentId, "caf_blocks._id": subscribtionAttributes.cafBlockId },{$addToSet: {"caf_blocks.$.subscribers" : this.userId}});
  }
});