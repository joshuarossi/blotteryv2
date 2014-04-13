/**
 * Created by josh on 4/13/14.
 */


function subscribeToAll(ws) {
    var addresses = Meteor.users.find({'profile.bitcoin_address': {$exists: true}}, {'profile.bitcoin_address': 1, _id: 0});
    addresses.forEach(function (each) {
        var requestObj = {"op": "addr_sub", "addr": each.profile.bitcoin_address};
        var request = JSON.stringify(requestObj);
        ws.sendUTF(request);
        console.log(request);
        var testRequest = {"op": "ping_tx"};
        ws.send(JSON.stringify(testRequest));
    })
}


function handleInputs(tx) {
    try {
        tx.x.inputs.forEach(function (entry) {
            var input = Object();
            input.address = entry.prev_out.addr;
            input.value = entry.prev_out.value;
            Meteor.users.update(
                {'profile.bitcoin_address': input.address},
                {$inc: {'profile.bitcoin_balance': input.value}}, upsert = false);
        });
    }
    catch (e) {
        console.log(e.stack);
    }
}


function handleOutputs(tx) {
    try {
        tx.x.out.forEach(function (output) {
            var myOut = Object();
            myOut.address = output.addr;
            myOut.value = output.value;
            Meteor.users.update(
                {'profile.bitcoin_address': myOut.address},
                {$inc: {'profile.bitcoin_balance': myOut.value}}, upsert = false);
        })
    }
    catch (e) {
        console.log(e);
    }
}


var incomingTransaction = function (tx) {
    console.log(tx);
    handleInputs(tx);
    handleOutputs(tx);
};

function connectionErrorHandler(error) {
    console.log("Connection Error: " + error.toString());
}

function connectionCloseHandler() {
    console.log('echo-protocol Connection Closed');
}

function connectionMessageHandler(message) {
    jsonMessage = JSON.parse(message.utf8Data);
    if (jsonMessage.op == 'utx') {
        console.log('first test passed');
        try {
            incomingTransaction(jsonMessage);
        }
        catch (e) {
            console.log(e.stack)
        }
    }
}

function connectFailedHandler(error) {
    console.log('Connect Error: ' + error.toString());
}

wrappedConnectionErrorHandler = Meteor.bindEnvironment(connectionErrorHandler);
wrappedConnectionCloseHandler = Meteor.bindEnvironment(connectionCloseHandler);
wrappedConnectionMessageHandler = Meteor.bindEnvironment(connectionMessageHandler);

function connectSuccessHandler(connection) {
    console.log('WebSocket client connected');
    subscribeToAll(connection);
    connection.on('error', wrappedConnectionErrorHandler);
    connection.on('close', wrappedConnectionCloseHandler);
    connection.on('message', wrappedConnectionMessageHandler);
}

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
    startWebSocket();

});