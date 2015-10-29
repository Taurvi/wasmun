debugMode = true;

debugMsg = function(msg) {
    if (debugMode)
        console.log('<<< DEBUG >>> ' + msg);
}

serverMsg = function(msg) {
    console.log('|| SERVER || ' + msg);
}

serverMsg('node.js is initializing');

// Initialization
var app = require('express')();
serverMsg(' Loaded express.');
var http = require('http').Server(app);
serverMsg(' Loaded http.');
var io = require('socket.io')(http);
serverMsg(' Loaded socket.io.');
var crypto = require('crypto');
serverMsg(' Loaded crypto.');


serverMsg('node.js is initialized.');

http.listen(3000, function(){
    serverMsg('Server is now listening on *:3000');
});

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

io.sockets.on('connection', function(socket){
    socket.on('formData', function(msg){
        serverMsg('Form Data Received: ' + msg );
    });
});


