let app = require('express')();
let bodyParser = require('body-parser');
let User = require('./db').model('User');
let path = require('path');

var secret = process.env.SECRET_KEY || "12345";

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

app.get('/key', function(req, res){

  if(!secret){
    console.error('no secret found');
    res.status(400).send("There is no key to be found! Add secret.json");
  }
  console.log("HERE IS THE SECRET ", secret);

  if(secret === '123456'){
    res.status(200).send("you can do administrative things now");

  } else {
    res.status(403).send("invalid key");
  }

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

app.use(function(req, res, next, error){
  console.error("Main error handling reached.", error);
  res.status(500).send("Internal Server error");
});

module.exports = app;