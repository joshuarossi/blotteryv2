/**
 * Created by josh on 4/13/14.
 */

var startWebSocket = function () {
    var WebSocketClient = Meteor.require('websocket').client;
    var client = new WebSocketClient();
    client.on('connectFailed', Meteor.bindEnvironment(connectFailedHandler));
    client.on('connect', Meteor.bindEnvironment(connectSuccessHandler));
    client.connect('ws://ws.blockchain.info/inv');
};

Meteor.startup(function () {
        Meteor.users.find().forEach(function (each) {
        console.log("Bitcoin Address: " + each.profile.bitcoin_address);
        var url = "https://blockchain.info/q/addressbalance/" + String(each.profile.bitcoin_address) + "?confirmations=0";
        var result = HTTP.get(url, 3000);
        if (result.statusCode == 200) {
            var response = result.content;
            console.log(response);
            Meteor.users.update(
                {'profile.bitcoin_address': each.profile.bitcoin_address},
                {$set: {'profile.bitcoin_balance': Number(response)}});
        }
    });
    var WebSocketClient = Meteor.require('websocket').client;
});