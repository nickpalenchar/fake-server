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

app.get('/users/some', function(req, res){

  let getUserById = function(id){
    return User.findById(id);
  };

  console.log("got here");

  return Promise.all([
    getUserById("58aa328cfc13ae658d000064")
    ,getUserById("58aa328cfc13ae658d000065")
    ,getUserById("58aa328cfc13ae658d000066")
  ])
    .then(data => {
      console.log("all data", data);
      res.status(200).send(data)
    });
});

app.get('/users/:id', function(req, res){
  User.findById(req.params.id)
    .then(data => res.status(200).send(data));
});

app.use(function(req, res, next, error){
  console.error("Main error handling reached.", error);
  res.status(500).send("Internal Server error");
});

module.exports = app;