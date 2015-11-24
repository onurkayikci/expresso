Template.errors.helpers({
  errors: function() {
    return Errors.find();
  },
  successes:function() {
    return Successes.find();
  }
});