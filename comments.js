// create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "comments.html");
});

app.post('/comments', urlencodedParser, function(req, res) {
    // Prepare output in JSON format
    response = {
        name: req.body.name,
        comment: req.body.comment
    };
    console.log(response);
    res.end(JSON.stringify(response));

    fs.appendFile('comments.json', JSON.stringify(response), function(err) {
        if (err) throw err;
        console.log('Saved!');
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});