let express = require('express');
let http = require('http');

let server = http.createServer();
let app = require('./app');

// MUST SET THE PORT DYNAMICALLY
app.set('port', process.env.PORT || 4040);
var port = app.get('port');

server.on('request', app);

server.listen(port, function(){
  console.log("server is listening on port ", port);
});