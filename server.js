// grab the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var timeout = require('connect-timeout')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(timeout('3s')); //kills the session with a timeout
var port = process.env.PORT || 8080;

// DB stuff here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
db.run("CREATE TABLE blogs (id integer primary key autoincrement, posts TEXT);");

// routes will go here
app.get('/blog/get', function(req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

  res.send(user_id + ' ' + token + ' ' + geo);
});
// POST http://localhost:8080/blog/post
// parameters sent with 
app.post('/blog/post', function(req, res) {
    var post = req.body.post;
    var stmt = db.prepare("INSERT INTO blogs(posts) VALUES(?);", post);
    stmt.run();
    stmt.finalize();
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
