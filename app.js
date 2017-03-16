let app = require('express')();
let bodyParser = require('body-parser');
let User = require('./db').model('User');

app.use(bodyParser());
app.use(function(req, res, next){
  console.log("NEW REQUEST");
  console.log("ROUTE: ", req.path);
  console.log("BODY:  ", req.body);
  next();
});

app.get('/', function(req, res){
  res.status(200).send("this is the home page");
});

app.get('/users', function(req, res){
  User.find({})
    .then(data => {
      console.log("dataa ", data);
      res.status(200).send(data);
    })
});

app.get('/users/:id', function(req, res){
  User.find({_id: req.params.id})
    .then(data => res.status(200).send(data));
});

app.use(function(req, res){
  console.error("Main error handling reached.");
  req.status(500).send("Internal Server error");
});

module.exports = app;