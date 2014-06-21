/**
 * Created by josh on 4/13/14.
 */

Template.balances.balances = function () {
    return Meteor.users.find();
};

Template.balances.events({
});

UI.registerHelper("Users", Meteor.users);

Template.signup_form.editingDoc = function () {
    return Meteor.user();
};