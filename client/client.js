/**
 * Created by josh on 4/13/14.
 */

function drawQR(uri) {
    var qrcodesvg = new Qrcodesvg(uri, "qrcode", 250);
    console.log(uri);
    qrcodesvg.draw();
}

Template.plugin.rendered = function () {
    drawQR('bitcoin:' + this.data.profile.bitcoin_address);
};

Template.balances.balances = function () {
    return Meteor.users.find();
};

Template.balances.events({
});

UI.registerHelper("Users", Meteor.users);

Template.signup_form.editingDoc = function () {
    return Meteor.user();
};

Template.signup_form.balance = function () {
    user = Meteor.user();
    satoshis = user.profile.bitcoin_balance;
    bitcoin = satoshis/1e8;
    return bitcoin
};

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});