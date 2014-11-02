$(document).ready(function() {
    $('#elem1').hover(
        function() { $('#elem1').css('background-color', 'grey'); },
        function() { $('#elem1').css('background-color', 'black'); }
    );
    $('#elem1').click(
        function() { document.location.href = "home.html";}
    );
});

$(document).ready(function() {
    $('#elem2').hover(
        function() { $('#elem2').css('background-color', 'grey'); },
        function() { $('#elem2').css('background-color', 'black'); }
    );
    $('#elem2').click(
        function() { document.location.href = "signupin.html";}
    );
});

$(document).ready(function() {
    $('#elem3').hover(
        function() { $('#elem3').css('background-color', 'grey'); },
        function() { $('#elem3').css('background-color', 'black'); }
    );
    $('#elem3').click(
        function() { document.location.href = "connect.html";}
    );
});

$(document).ready(function() {
    $('#elem4').hover(
        function() { $('#elem4').css('background-color', 'grey'); },
        function() { $('#elem4').css('background-color', 'black'); }
    );
    $('#elem4').click(
        function() { document.location.href = "orgs.html";}
    );
});

$(document).ready(function() {
    $('#elem5').hover(
        function() { $('#elem5').css('background-color', 'grey'); },
        function() { $('#elem5').css('background-color', 'black'); }
    );
    $('#elem5').click(
        function() { document.location.href = "pricing.html";}
    );
});

$(document).ready(function() {
    $('#elem6').hover(
        function() { $('#elem6').css('background-color', 'grey'); },
        function() { $('#elem6').css('background-color', 'black'); }
    );
    $('#elem6').click(
        function() { document.location.href = "sponsors.html";}
    );
});

$(document).ready(function() {
    $('#elem7').hover(
        function() { $('#elem7').css('background-color', 'grey'); },
        function() { $('#elem7').css('background-color', 'black'); }
    );
    $('#elem7').click(
        function() { document.location.href = "aboutus.html";}
    );
});

$(document).ready(function() {
    $('#elem8').hover(
        function() { $('#elem8').css('background-color', 'grey'); },
        function() { $('#elem8').css('background-color', 'black'); }
    );
    $('#elem8').click(
        function() { document.location.href = "support.html";}
    );
});

$(document).ready(function() {
    $('#send').hover(
        function() { $('#send').css('background-color', 'grey'); },
        function() { $('#send').css('background-color', 'red'); }
    );
});

/*
// getting-started.js
require('mongoose');

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
*/
//connect.html
var userCredential = "";
$(document).ready(function() {

    $('#send').click(
        function() { 
	    console.log("The button has been clicked");
	    var messageToSend = $('#msgtext').val();
	    console.log("The box should be empty now");
	    $('#msgtext').value = "";
	    console.log(messageToSend);
	    var jsonData = {
		"message":messageToSend,
		"subject":"NullPointerException"
	    };
	    console.log(JSON.stringify(jsonData));
	    
	    location.reload();
	    //window.location = window.location; 
	    
	    $.ajax({
		url: 'http://104.236.58.7:3000/spam',
		type: 'POST',
		crossDomain: true,
		dataType: 'json',
		data: jsonData,
		success: function(responseData, textStatus, jqXHR) {

		},
		error: function (responseData, textStatus, errorThrown) {

		}
	    });
	    
	}
    );

    $('#signupbutton').click(
	function(){
	    var userName = $('#signupemail').val();
	    var passWord = $('#signuppwd').val();
	    console.log("This is the username: " + userName);
	    console.log("This is the password: " + passWord);
	    var jsonData = {
		"username":userName,
		"password":passWord
	    };
	    location.reload();
	    $.ajax({
		url: 'http://104.236.58.7:80/register',
		type: 'POST',
		crossDomain: true,
		dataType: 'json',
		data: jsonData,
		success: function(responseData, textStatus, jqXHR) {

		},
		error: function (responseData, textStatus, errorThrown) {

		}
	    });
	});
    $('#loginbutton').click(
	function(){
	    console.log("LoginButton clicked");
	    var userName = $('#loginemail').val();
	    var passWord = $('#loginpwd').val();
	    var jsonData = {
		"username":userName,
		"password":passWord
	    };
	    //location.reload();
	    $.ajax({
		url: 'http://104.236.58.7:80/login',
		type: 'POST',
		crossDomain: true,
		dataType: 'json',
		data: jsonData,
		success: function(responseData, textStatus, jqXHR) {
		    console.log("This is the response data: " + responseData);
		    console.log("This is the response data: " + responseData.containsData);
		    
		    var indexOf = userName.indexOf("@");
		    if(indexOf > 0){
			userCredential = userName.substring(0,indexOf);
		    }else{
			userCredential = userName;
		    }
		    
		    console.log("UserCredential is: " + userCredential);
		    if(responseData.containsData === "yes"){
			alert("You have successfully logged in!");
		    }else{
			alert("You have failed to log in");
		    }
		},
		error: function (responseData, textStatus, errorThrown) {
		    alert("You have failed to log in");
		    console.log("This is the error response data: " + responseData);
		    console.log("This is the error response data: " + responseData.containsData);
		    console.log(textStatus);
		    console.log(errorThrown);
		}
	    });
	});
});
