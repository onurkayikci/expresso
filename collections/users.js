/*Meteor.users.deny({
  update: function() {
    return true;
  }
}); */

Meteor.methods({   //server side methods
  updateProfile: function(profileAttributes) {
    check(this.userId, String);

    console.log("updating profile");

    Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile': profileAttributes }});
  },
  getUserName : function (userId){
    check(userId, String);


    var userName = new String();
    console.log("user ID: " + JSON.stringify(userId));
    var user = Meteor.users.findOne({ _id : userId });
    console.log("user found: " + JSON.stringify(user));
    var userName = user.profile.first_name + " " + user.profile.last_name;
    console.log("user NAme: " + JSON.stringify(userName));


    return userName;
  }
});