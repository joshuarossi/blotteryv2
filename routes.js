/**
 * Created by josh on 6/21/14.
 */
Router.configure({
    notFoundTemplate: 'notFound' // this will render
});
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
    this.route('balances', {path: '/balances',
        layoutTemplate: 'layout',
        yieldTemplates: {
            'header': {to: 'header'},
            'footer': {to: 'footer'}
        }
    });
    this.route('signup_form', {path: '/signup',
        layoutTemplate: 'layout',
        yieldTemplates: {
            'header': {to: 'header'},
            'footer': {to: 'footer'}
        }});
    this.route('about');
    this.route('plugin', {
        path: '/plugin/:username',
        data: function () {
            return Meteor.users.findOne({'username':this.params.username});
        }
    });
});
