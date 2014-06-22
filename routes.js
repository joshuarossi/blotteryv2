/**
 * Created by josh on 6/21/14.
 */
Router.map(function () {
    this.route('home', {path: '/'});
    this.route('balances', {path: '/balances'});
    this.route('profile', {path: '/profile'});
    this.route('signup_form', {path: '/signup'});
    this.route('about');
    this.route('plugin', {
        path: '/plugin/:username',
        data: function () {
            console.log(this.params);
//            return Meteor.users.findOne({'username': this.params.username})
            return this.params
        }
    });
});
