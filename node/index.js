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
serverMsg(' Loaded socket.io.')
var mysql      = require('mysql');
serverMsg(' Loaded mySql.');
/*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'username',
    password : 'pass',
    database : 'database'
});

connection.connect();
serverMsg(' Loaded mySql connection.');*/

serverMsg('node.js is initialized.');

http.listen(3000, function(){
    serverMsg('Server is now listening on *:3000');
});

io.on('formData', function(msg){
    serverMsg('Form Data Received: ' + msg );
});

