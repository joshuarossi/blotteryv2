/**
 * Created by josh on 6/21/14.
 */

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'layout',
        yieldTemplates: {
            'header': {to: 'header'},
            'footer': {to: 'footer'}
        }
    });
    this.route('balances', {path: '/balances'});
    this.route('signup_form', {path: '/signup'});
    this.route('about');
    this.route('plugin', {
        path: '/plugin/:username',
        data: function () {
//            return Meteor.users.findOne({'username': this.params.username})
            return this.params
        }
    });
});
