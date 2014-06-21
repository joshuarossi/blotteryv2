/**
 * Created by josh on 4/13/14.
 */

Template.balances.balances = function () {
    return Meteor.users.find();
};

Template.balances.events({
    'click input': function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
            console.log("You pressed the button");
    }
});
