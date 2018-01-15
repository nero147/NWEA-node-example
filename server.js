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
var db = new sqlite3.Database('db.sqlite', sqlite3.OPEN__READWRITE);
//The next is if you need to recreate the DB, but a base one is checked in
//db.run("CREATE TABLE blogs (id integer primary key autoincrement, title TEXT, body TEXT);");

// POST http://localhost:8080/posts
app.get('/posts', function(req, res) {
      db.all("SELECT id, title, body FROM blogs", [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            res.write(row.id + ' ' + row.title + ' ' + row.body + '\r');  
        });
        res.end()  
    });
});
// POST http://localhost:8080/post
// parameters sent with 
app.post('/post', function(req, res) {
    var body = req.body.body;
    var title = req.body.title;
    var stmt = db.prepare("INSERT INTO blogs(body, title) VALUES(?, ?);", body, title);
    stmt.run();
    stmt.finalize();
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);