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


//connect.html
$(document).ready(function() {
    $('#send').click(
        function() { 
	    console.log("The button has been clicked");
	    var messageToSend = $('#msgtext').value;
	    $.post("http://localhost:3000/spam",
		   {
		       "message":messageToSend,
		       "subject":"NullPointerException"
		   },
		   function(data,status){
		       console.log("This is the status: " + status);
		   });
	}
    );
});
