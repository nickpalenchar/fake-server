let express = require('express');
let http = require('http');

let server = http.createServer();
let app = require('./app');

server.on('request', app);

server.listen(4040, function(){
  console.log("server is listening on port 4040");
});