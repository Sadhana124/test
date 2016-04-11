/**
 * Created by SadhanaRamachandran on 4/9/16.
 */
var express = require('express');
var app = express();
var http = require("http");
var bodyParser = require('body-parser');

// view engine setup
app.set('port', process.env.port || 3000);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/myaction', function(req, res) {
    //res.send('You sent the name "' + req.body.name + '".');
    //var params = url.parse(request.url,true).query;

    var a = req.body.firstName;
    var b = req.body.lastName;

    response.write(a);
    response.write(a);
    res.send('Hello World from post!');
    response.end();
});

app.listen(app.get('port'), function() {
    console.log("Express server listening on port" + app.get('port'));
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/*http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port" + app.get('port'));
});*/

var fs = require("fs");
var file = "./test3.db";
var exists = fs.existsSync(file);

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
    if(!exists) {
        //db.run("CREATE TABLE Stuff (thing TEXT)");
        db.run("CREATE TABLE traffic (ts INTEGER, destination_ip TEXT, destination_vn TEXT," +
            "direction_ingress INTEGER, destination_port INTEGER, protocol INTEGER, source_ip TEXT," +
            "source_vn TEXT, source_port INTEGER, sum_bytes_kb INTEGER, sum_packets INTEGER)");
    }

    var stmt = db.prepare("INSERT INTO traffic VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    stmt.run(1460161560000000, "10.2.1.3", "virtual-network1", 1, 9117, 6, "10.1.1.3",
    "virtual-network2", 41322, 15328, 44000);
    stmt.run(1460161560000001, "10.2.1.4", "virtual-network1", 1, 9117, 6, "10.1.1.3",
        "virtual-network2", 41322, 15328, 44000);

//Insert random data
    /*var rnd;
    for (var i = 0; i < 10; i++) {
        rnd = Math.floor(Math.random() * 10000000);
        stmt.run("Thing #" + rnd);
    }*/

    stmt.finalize();
    /*db.each("SELECT ts, destination_ip, destination_vn, direction_ingress," +
        "destination_port, protocol, source_ip, source_vn, source_port" +
        "sum_bytes_kb, sum_packets FROM traffic", function(err, row) {
        console.log(row.ts + ": " + row.destination_ip+ ": " + row.destination_vn+ ": " + row.direction_ingress
            + ": " + row.destination_port + ": " + row.protocol+ ": " + row.source_ip+ ": "
            + row.source_vn+ ": " + row.source_port+ ": " + row.sum_bytes_kb+ ": " + row.sum_packets);
    });*/

    db.each("SELECT ts FROM traffic", function(err, row) {
        console.log(row.ts);
    });
});

db.close();

module.exports = app;





