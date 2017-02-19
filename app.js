let app = require('express')();
let bodyParser = require('body-parser');

app.use(bodyParser());
app.use(function(req, res, next){
  console.log("NEW REQUEST");
  console.log("ROUTE: ", req.route);
  console.log("BODY:  ", req.body);
  next();
});

app.use(function(req, res){
  console.error("Main error handling reached.");
  req.status(500).send("Internal Server error");
});

module.exports = app;