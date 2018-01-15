// grab the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var timeout = require('connect-timeout')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(timeout('10s')); //kills the session with a timeout
var port = process.env.PORT || 8080;

// DB stuff here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blog.db', sqlite3.OPEN__READWRITE);
//The next is if you need to recreate the DB, but a base one is checked in
//db.run("CREATE TABLE posts (post_id integer primary key autoincrement, title TEXT, body TEXT);");

// POST http://localhost:8080/posts
app.get('/posts', function(req, res) {
      db.all("SELECT post_id, title, body FROM posts", [], (err, rows) => {
        if (err) {
            throw err;
        }
        // Return the results
        res.json(rows);
    });
});
// POST http://localhost:8080/post
// parameters sent with 
app.post('/post', function(req, res) {
    var body = req.body.body;
    var title = req.body.title;
    var stmt = db.prepare("INSERT INTO posts(body, title) VALUES(?, ?);", body, title);
    stmt.run();
    stmt.finalize();
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);