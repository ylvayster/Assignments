$(function(){

var chuckURL = "http://api.icndb.com/jokes";
var cookieURL = "https://bakverksapi.herokuapp.com/bakverk";

//Get the current number of jokes in the API
	$.ajax({
	type: "GET",
	url: (chuckURL + "/count"),
	success: function(data){
		$('#count').html(data.value);}
	});

//One nerdy joke
$(document.body).on('click', '#nerdy', function(e){
	e.preventDefault();
	$.ajax({
	type: "GET",
	url: (chuckURL + "/random?limitTo=[nerdy]"),
	success: function(data){
		$('#jokes').html("<p id=\"joke\"></p>");
		$('#joke').append(data.value.joke);}
	});
  });

//One dirty joke
$(document.body).on('click', '#explicit', function(e){
	e.preventDefault();
	$.ajax({
	type: "GET",
	url: (chuckURL + "/random?limitTo=[explicit]"),
	success: function(data){
		$('#jokes').html("<p id=\"joke\"></p>");
		$('#joke').append(data.value.joke);}
	});
  });

//Ten jokes
$(document.body).on('click', '#ten', function(e){
	e.preventDefault();
	$.ajax({
	type: "GET",
	url: (chuckURL + "/random/10"),
	success: function(data){
		$('#jokes').html("<ol id=\"list\"></ol>");
		$(data.value).each(function(){
  		$("#list").append("<li>" + this.joke + "</li>");});
	}
  });
});

//Personalized random joke
$(document.body).on('click', '#customize', function(e){
	e.preventDefault();
	var firstname = $('#firstname').val();
	var lastname = $('#lastname').val();
	if (firstname && lastname != "") {
	$.ajax({
	type: "GET",
	url: (chuckURL + '/random?firstName=' + firstname + '&lastName=' + lastname),
		success: function(data){
		$('#customized').html("<p id=\"customjoke\"></p>");
		$('#customjoke').append(data.value.joke);
	}  });
} else {
	alert("Please enter your name for the ultimate joke experience!")
}
});

//Load cookieRating.html into section 
$(document.body).on('click', '#cookie', function(e){
	e.preventDefault();
	$('#cookieRating').load('cookieRating.html');	
});

//Rate cookie
$(document.body).on('click', '#addCookie', function(e){
	e.preventDefault();
	var cookie = $('#cookieType').val();
	var rating =  $('#rating').val();
	$.ajax({
	type: "POST",
	url: cookieURL,
	data: {
	namn: cookie,
	betyg: rating
	},
	success: function(){
		$('#cookieInput').html("<p>You just posted \"" + cookie + "\" with a rating of \"" + rating + "\"</p>") ;
	}  
	});
});

});
