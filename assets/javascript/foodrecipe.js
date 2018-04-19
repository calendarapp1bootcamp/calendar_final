function clear() {
    $("#images").empty();
  }

$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    clear();
  
    // build the query URL for the ajax request to the NYT API
    
    var searchString = $("#breakfast").val().trim();

    console.log(searchString)
    var imgUrl = "https://api.giphy.com/v1/gifs/search?q=" +
    searchString + "%20recipe&api_key=9xJnkK21EgEgXx7sP8hxxkbaS9dGkwcX&limit=2";
    console.log(imgUrl)
    // make the AJAX request to the API - GETs the JSON data at the queryURL.
    // the data then gets passed as an argument to the updatePage function
    $.ajax({
      url: imgUrl,
      method: "GET"
    })

    .then(function(response) {

        var results = response.data;

        console.log(results)
        for (var i = 0; i < results.length; i++) {
    // Creating an image tag
        var recipeImage = $("<img>");

        var gifDiv = $("<div class='item'>");
    
       

        // Giving the image tag an src attribute of a proprty pulled off the
         // result item
        recipeImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(recipeImage);

        $("#images").prepend(gifDiv);
    }


        
    });
});
