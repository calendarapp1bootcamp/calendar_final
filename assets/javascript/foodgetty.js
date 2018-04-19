

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
  
    // build the query URL for the ajax request to the NYT API
    
    var searchString = $("#breakfast").val().trim();

    console.log(searchString)
    var imgUrl = "https://api.gettyimages.com/v3/search/images?phrase=" + searchString + "&page_size=2";
    
    // make the AJAX request to the API - GETs the JSON data at the queryURL.
    // the data then gets passed as an argument to the updatePage function
    $.ajax({
      url: imgUrl,
      method: "GET",
      headers: {
        "Api-Key": "zt3qz3uwde547aygc5wkja7a"
    }

    }).done(function(response){

		console.log(response);
    
        var image = response;
        grabImage(image);


        
    });
});

function grabImage(response) {
	for(i = 0; i < response.images.length; i++){
		var img = $("<img>"); //creates an image dom eleement
		img.attr({
			src: response.images[i].display_sizes[0].uri,
			'data-aos': 'fade-up',
			id: i,
			class: 'hover-img'
		});
		writeToDom(img);
	};
    setImageAnimateOffset();
}

function setImageAnimateOffset() {
	setTimeout(function() {
		
	}, 500)

	//Do it again just in case
	setTimeout(function() {
		
	}, 1500)
}



function writeToDom(imageElement) {
	$("#images").append(imageElement);
    console.log(imageElement);
}



//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);

function clear() {
    $("#images").empty();
  }
