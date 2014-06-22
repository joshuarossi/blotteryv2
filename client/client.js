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
Template.signup_form.rendered = function () {
    user = Meteor.user();
    console.log(user);
    satoshis = user.profile.bitcoin_balance;
    console.log(satoshis);
    bitcoin = satoshis / 1e8;
    console.log(bitcoin);
    return bitcoin
};

Template.signup_form.balance = function () {
    user = Meteor.user();
    console.log(user);
    satoshis = user.profile.bitcoin_balance;
    console.log(satoshis);
    bitcoin = satoshis/1e8;
    console.log(bitcoin);
    return bitcoin
};

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});