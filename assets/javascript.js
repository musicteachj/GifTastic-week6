$( document ).ready(function() {
//  Array of Musicians
	var musicians = ["Jimi Hendrix", "Eric Clapton", "Stevie Ray Vaughan", "Jack White", "John Lennon"];

// Function that will display when button is clicked
function displayGifButtons(){
    // Grabs the #musicButtons and empties them out
    $("#musicButtons").empty(); 
    // Loop through the musicians array
    for (var i = 0; i < musicians.length; i++){
        var gifButton = $("<button>");
        // Add classes to the button
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", musicians[i]);
        gifButton.text(musicians[i]);
        // Adds the new button to the #musicButtons
        $("#musicButtons").append(gifButton);
    }
}

// Add new button to the new giff
function addNewButton(){
    $("#addMusician").on("click", function(){
    var action = $("#music-input").val().trim();
    if (action == ""){
      return false; // added so user cannot add a blank button
    }
    // Pushes the new musician, add action class
    musicians.push(action);

    displayGifButtons();
    return false;
    });
}

// Remove button function
function removeLastButton(){
    $("removemusician").on("click", function(){
    musicians.pop(action);
    displayGifButtons();
    return false;
    });
}

function displayGifs(){
    var action = $(this).attr("data-name");
    // Giphy API Key
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); // console test to make sure something returns
        $("#containGifs").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i = 0; i < results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#containGifs").prepend(gifDiv);
        }

        var descriptiveHeader = $("<h1>");
          descriptiveHeader.text(action);
          $("#containGifs").prepend(descriptiveHeader);

    });
}

// Run Functions
displayGifButtons(); 
addNewButton();
removeLastButton();

// Get data when clicked
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

});