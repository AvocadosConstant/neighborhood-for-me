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
