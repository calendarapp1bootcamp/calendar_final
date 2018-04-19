$( document ).ready(function() {
    console.log( "ready!" );
    $("#empty-div").html("<h1>Hello friends!</h1>");

    var queryURL = "https://api.pexels.com/v1/search?query=nature&per_page=15&page=1";

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "Authorization": "563492ad6f917000010000010a09187d078d45bfbc9c44fcd3112f74"
        }
    }).then(function(response){
        
        console.log(response);
        console.log("mango");

        var results = response.photos;

        console.log(results)
        // chooses random background
        let randomNum = Math.floor(Math.random() * (14 - 0) + 0);
           
        var backgroundURL = results[randomNum].src.original
        var finalURL = "'url(" + backgroundURL + ")'"
        console.log("backgroundURL:", backgroundURL)
        console.log("finalURL: ", finalURL)
        // adds picture url to background
        
        $('body').css('background-image', "url("+backgroundURL+")");
     


        // chooses random photo
        
        
        
    }); 
});

