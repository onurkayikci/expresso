//this function should be called in server
_getUserName = function(userId){
  var user = Meteor.users.findOne({ _id : userId });
  if(user!= null && typeof user != 'undefined')
    return user.profile.first_name + " " + user.profile.last_name;
  else
    return null;  
}
