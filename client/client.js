/**
 * Created by josh on 4/13/14.
 */

Template.main.balances = function () {
    return Meteor.users.find();
};

Template.main.events({
    'click input': function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
            console.log("You pressed the button");
    }
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});