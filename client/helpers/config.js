Accounts.ui.config({
  //passwordSignupFields: 'USERNAME_ONLY',
  requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'first_name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'last_name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
              errorFunction("Please write your last name");
              return false;
            } else {
              return true;
            }
          }
    }
    ]
});