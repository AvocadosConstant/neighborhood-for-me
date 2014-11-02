var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var util = require('util');
var dotenv = require('dotenv');
dotenv.load();
var sendgrid = require('sendgrid')(process.env.API_USER, process.env.API_KEY);
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

app.use(bodyParser.json());

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

app.post('/spam',function(req, res){
    
    var textBody = req.body.message;
    var companyName = req.body.subject;
    res.writeHead(200, {'content-type': 'text/plain'});
    Contacts.find(function(err,dbContacts){
	for(var i = 0; i < dbContacts.length; i ++){
	    var textToSend = "";
	    var textBodyTemp = textBody;
	    console.log("This is textBodyTemp: " + textBodyTemp);
	    var numMessage = 1;
	    while(textBodyTemp != ""){
		console.log("We ARE  getting in here");
		if(textBodyTemp.length <= 136){
		    textToSend = textBodyTemp;
		    textBodyTemp = textBodyTemp.substring(0,0);
		}else{
		    textToSend = textBodyTemp.substring(0,136);
		    textBodyTemp = textBodyTemp.substring(136,textBodyTemp.length);
		}
		sendgrid.send({
		    to:       dbContacts[i].email,
		    from:     companyName + '@neighborhoodfor.me',
		    subject:  numMessage,
		    text:     textToSend
		}, function(err, json) {
		    if (err) {console.error(err); }
		    console.log(json);
		});
		numMessage ++;
	    }
	}	
    });
    res.end();
});

app.post('/email',function(req, res){
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files){
	res.writeHead(200, {'content-type': 'text/plain'});
	var passed = fields.from[0];
	console.log("passed: " + passed);
	var emailNumber = passed.match(/^(\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b)/igm)[0];
	console.log("emailNumber: " + emailNumber);
	var alreadyPresent = false;
	Contacts.find(function(err,dbContacts){
	    console.log("We are looking to see if the contact is already here");
	    for(var i = 0; i < dbContacts.length; i ++){
		console.log(dbContacts[i].email);
		if(dbContacts[i].email === emailNumber){
		    alreadyPresent = true;
		    console.log("It is already present");
		    break;
		}
	    }
	    if(!alreadyPresent){
		console.log(alreadyPresent);
		var contact = new Contacts({email:emailNumber});
		contact.save(function(err, contact){
		    if(err) return console.log(err);
		});
	    }
	});
	sendgrid.send({
	    to:       emailNumber,
	    from:     'updates@neighborhoodfor.me',
	    subject:  'Registration',
	    text:     'You have been registered for neighbormail!'
	}, function(err, json) {
	    if (err) {console.error(err); }
	    console.log(json);
	});
	res.end();
    });
    /*
    var emailNumber = req.body.from;
    // var jsonstring = JSON.stringify(req.body);
    
    //console.log("This is the BODY!!!: \n" + bodyString); 
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log("This is the phone number " + emailNumber);
    var contact = new Contacts({email:emailNumber});
    contact.save(function(err, contact){
        if(err) return console.log(err);
    });
    console.log("This is the emailNumber stored: " + contact.email);
    res.end();
    */
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
