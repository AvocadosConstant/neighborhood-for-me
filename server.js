var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var contactSchema = new mongoose.Schema({
    email: String
});

var Contacts = mongoose.model('Contacts',contactSchema);

var charlie = new Contacts({email:"6319016772@vztext.com"});

console.log(charlie.email);



app.use(bodyParser.json());
// app.use(express.json());
app.get('/', function(req, res){
    res.send('Hello World!');
});

/*
app.post('/',function(req, res){
    var emailNumber = req.body.email;
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("This is the phone number " + emailNumber);
    var contact = new Contacts({email:emailNumber});
    contact.save(function(err, contact){
        if(err) return console.log(err);
    });
    console.log("This is the emailNumber stored: " + contact.email);
    res.end();
});
*/
app.post('/email',function(req, res){
    var emailNumber = req.body.from;
    var jsonstring = JSON.stringify(req.body);
    console.log("This is the BODY!!!: \n" + jsonstring);
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("This is the phone number " + emailNumber);
    var contact = new Contacts({email:emailNumber});
    contact.save(function(err, contact){
        if(err) return console.log(err);
    });
    console.log("This is the emailNumber stored: " + contact.email);
    res.end();
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http:blahblah", host,port);
    Contacts.find(function(err,dbContacts){
        if(err) return console.log(err);
        console.log(dbContacts);
    }); 

});
