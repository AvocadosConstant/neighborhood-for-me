var express = require("express");
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

var organizationSchema = new mongoose.Schema({
    email: String,
    password: String
});

var Organizations = mongoose.model('Organizations',organizationSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('home.html')
});

app.post("/user/add", function(req, res) { 
    /* some server side logic */
    res.send("OK");
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){ 
    console.log('static file request : ' + req.params);
    res.sendfile( __dirname + req.params[0]); 
});

app.post("/register", function(req, res){
    var orgUserName = req.body.username;
    var passWord = req.body.password;
    console.log("This is the password: " + passWord);
    console.log("This is the userName: " + orgUserName);
    res.writeHead(200, {'content-type': 'text/plain'});
    var organization = new Organizations(
	{email:orgUserName,
	 password:passWord
	});
    organization.save(function(err, contact){
	if(err) return console.log(err);
    });
    Organizations.find(function(err,dbOrganizations){
	if(err) return console.log(err);
	for(var i = 0; i < dbOrganizations.length; i ++){
	    console.log("Database: " + dbOrganizations[i].email);
	    console.log("Database: " + dbOrganizations[i].password);
	}
    });
    res.end();
});

app.post("/login", function(req, res){
    var orgUserName = req.body.username;
    var passWord = req.body.password;
    console.log("This is the password: " + passWord);
    console.log("This is the userName: " + orgUserName);
    res.writeHead(200, {'content-type': 'text/plain'});
    var index = -1;
    var contains = "no";
    Organizations.find(function(err,dbOrganizations){
	if(err) return console.log(err);
	for(var i = 0; i < dbOrganizations.length; i ++){
	    console.log("This is the email: " + dbOrganizations[i].email);
	    console.log("This is the pass: " + dbOrganizations[i].password);
	    if(orgUserName === dbOrganizations[i].email){
		index = i;
		console.log("This is the email inside: " + dbOrganizations[i].email);
		console.log("This is the pass inside: " + dbOrganizations[i].password);
		console.log("this is the index : " + i);
	    }
	}
	if(index >= 0){
	    console.log("This is the index: " + index);
	    if(dbOrganizations[index].password === passWord){
		contains = "yes";
	    }
	}
    });
    //res.setHeader('Content-Type', 'application/json');
    res.type=('text/plain');
    res.send(JSON.stringify({'containsData':contains}));
    //res.write(JSON.stringify({'containsData':contains}));
    res.end(); 
});1

var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log("Listening on " + port);
    Organizations.find(function(err,dbOrganizations){
        if(err) return console.log(err);
        console.log(dbOrganizations);
    }); 
});
