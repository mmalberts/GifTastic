//define our topics array
var topics = [];

//create functionality for submit button
//when submit button is clicked, the value of the text gets pushed into the array
//check array first to be sure not to create duplicate buttons
$(document).on("click", "#submit", function() {
	event.preventDefault();
	var value = $("#user-text").val().trim();
	// console.log(value);
	$("#user-text").val("");
	if (topics.indexOf(value) === -1) {
		topics.push(value);
	}
	$("#button-div").empty();
	//create for loop to generate a button for each item in the topics array
	for (i=0; i<topics.length; i++) {
		var btnVal = topics[i];
		var newBtn = $("<button>")
		newBtn.attr("data-name", btnVal);
		newBtn.text(btnVal);
		newBtn.addClass("btn btn-info");
		newBtn.attr("id", "feelings-btn")
		$("#button-div").append(newBtn);
	}
});

//create functionality for buttons
//when clicked, store data-name as a variable
//run ajax call on giphy api
//set q equal to data-name

var APIKey = "4MxJ8XAPdO0MFK8863gVo37RdaUgTacM";

$(document).on("click", "#feelings-btn", function() {
	$("#gif-div").empty();
	var searchFor = $(this).attr("data-name");
	// console.log(searchFor);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchFor + "&api_key=" + APIKey + "&limit=10";

	$.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response) {
    	console.log(response);
    	var results = response.data;

    	//loop through response and take each gif one by one
    	for (i=0; i<results.length; i++) {
    		//create div to hold gif and rating
    		var gifBox = $("<div>");
    		//create image with gif url
    		var gif = $("<img id='gif'>");
    		gif.attr("src", results[i].images.original_still.url);
    		gif.attr("data-state", "still");
    		gif.attr("data-still", results[i].images.original_still.url);
    		gif.attr("data-animate", results[i].images.original.url);
    		gif.attr("height", "150px");
    		//create p with gif rating
    		var rating = $("<p>");
    		rating.text("Rating: " + results[i].rating);
    		gifBox.append(rating);
    		gifBox.append(gif);
    		gifBox.attr("id", "gif-box");
    		$("#gif-div").append(gifBox);
    	}
    });
});

//when gif is clicked. change the source to the correct url (still or animate), and update the data-state
$(document).on("click", "#gif", function() {
	var stillURL = $(this).attr("data-still");
	var animateURL = $(this).attr("data-animate");
	var dataState = $(this).attr("data-state");
	if (dataState === "still") {
		$(this).attr("src", animateURL);
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", stillURL);
		$(this).attr("data-state", "still");
	};
});

