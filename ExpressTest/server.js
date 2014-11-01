var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
// app.use(express.json());
app.get('/', function(req, res){
    res.send('Hello World!');
});

app.post('/',function(req, res){
    var number = req.body.number;
    console.log("This is the phone number " + username);
    res.end();
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http:blahblah", host,port);
});
