/*
https://wger.de/en/user/api-key
Your API key
25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa

# In the request header
Authorization: Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa

# Example with curl
curl -X GET https://wger.de/api/v2/workout/ \
     -H 'Authorization: Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa'

{id: 10, name: "Abs"}
{id: 8, name: "Arms"}
{id: 12, name: "Back"}
{id: 14, name: "Calves"}
{id: 11, name: "Chest"}
{id: 9, name: "Legs"}
{id: 13, name: "Shoulders"}
*/

var fail = 0;
var eid = ""; 
var etype = ""; 
//var imgArrayBox = [];
var imageOrphanArray = [];
var wishObj = {};


$( window ).on( "load", function() {

  var muscleGroup = [
    {category: 10, name: "category" , text : "Abs"},
    {category: 8, name: "category" , text : "Arms"},
    {category: 12, name: "category" , text : "Back"},
    {category: 14, name: "category" , text : "Calves"},
    {category: 11, name: "category" , text : "Chest"},
    {category: 9, name: "category" , text : "Legs"  },
    {category: 13, name: "category" , text :"Shoulders"}
  ];

  muscleGroup.forEach(function(element){

    btnText = element.text;
    btnName = element.name;
    btnValue = element.category;
    var btnData = $('<button>').text(btnText); 

    var inputBtnData = $('<input>'); 

    btnData.attr({
      name : btnName,
      value : btnValue,
      class : "btn btn-outline-primary btnbody",
      "aria-pressed":"true",
      "type" : "button"
    })

    inputBtnData.attr({
      name : btnName,
      value : btnValue,
      "type" : "checkbox"
    })

    btnData.append(inputBtnData);
    $("#musclelist").append( btnData )
  })

  $(document).on("click", "#worksubmit", workGetter);
  //savemodal
  //$("#exampleModal").on("click", "show.bs.modal", saveFoodEvent);

  // $('#exampleModal').on('show.bs.modal', function (event) {
  //   var button = $(event.relatedTarget) // Button that triggered the modal
  //   var recipient = button.data('btnid') // Extract info from data-* attributes
  //   console.log(button);
  //   console.log(recipient);
  //   var modal = $(this)
  //   modal.find('.modal-title').text('New message to ' + recipient)
  //   //modal.find('.modal-body input').val(recipient)
  // })

});

//var zomapi = a9f103698b4f0c331c939d53be137fea


function workGetter(event) {
  event.preventDefault();

  var serialInput = $( "form" ).serialize();
  
  if (serialInput == "") {
    alert("MUSCLE/S must be choosen");
    $("#wodhelp").text("MUSCLE/S must be choosen");
    return false;
  }
  else{
      //var queryURL = "https://wger.de/api/v2/exercise/?language=2&status=2&";
      var queryURL = "https://wger.de/api/v2/exercise/?language=2&status=2&limit=5&";
      queryURL += serialInput;
      userChoiceDisplay = serialInput;
      $("#wodhelp").text("You entered: " + userChoiceDisplay);
  }

  //console.log(serialInput);
    //var queryURL = "https://wger.de/api/v2/exercisecategory/";
    //var queryURL = "https://wger.de/api/v2/muscle/";
    //var queryURL = "https://wger.de/api/v2/exerciseimage/";
    //var queryURL = "https://wger.de/api/v2/exerciseinfo/10/";
    //var queryURL = "https://wger.de/api/v2/exerciseimage/4/thumbnails/";

    console.log(queryURL)
  
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "Authorization": "Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa" } 

    })
    .then(function(response) {

      console.log("response ____1")
      console.log(response.results)
      resultsArray = response.results;
      
      resultsArray.forEach(function(wgerObj){
          workID = wgerObj.id;   
          getXData(workID);

      })


    });
  }

  function getXData(inID) {
    
    //imgArrayBox.push(inUrlData);
    // console.log("imgArrayBox");
    // console.log(imgArrayBox.length);

    var searchID = inID + "/";
    var queryURL = "https://wger.de/api/v2/exerciseinfo/";
    queryURL += searchID;
  
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "Authorization": "Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa" } 
    })
    .then(function(response) {
        //console.log("response");
        //console.log(response);
      if (Object.keys(response).length > 0){       

          wodObject = response;
          //console.log(wodObject.name);
          wodName = wodObject.name;
          wodDesc = wodObject.description;
          wodCat = wodObject.category.name;
          wodEquip = wodObject.equipment;
          wodMusc1 = wodObject.muscles;
        }
        else {
            fail++
            console.log("fail: " + fail)
        }
        
        displayCard = $("<div class='card'>");

        displayCard.attr({
          'id': inID,
        })

        displayHead = $("<div class='card-header'>").text( wodCat);
        displayBody = $("<div class='card-body'>");
        displayTitle = $("<h5 class='card-title'>").text( wodName);
        displayDesc = $("<p class='card-text'>").html( wodDesc );

        displayCard.append(displayHead);
        displayBody.append(displayTitle);
        displayBody.append(displayDesc);
        displayCard.append(displayBody);
        $("#wodresults").append( displayCard );

        imageGetter(inID);

      //stuff.data.forEach(function(wodObject) {
        //var resultsImages = wodObject.medium_cropped.url
        // var p1 = $("<p>").html(resultName + "<br/>" + resultAddy + "<br/>");
        // p1.append(addSavBtn)
        // restaurantData.append(p1);
        // newFlex.append(btnData);
        // $( btnData ).after(function() {
        //   return restaurantData;
        // });
        //$("#results").append( resultsImages )
     // })

    });
  }

  function imageGetter(inImgID,) {

    var searchID = inImgID;
    var searchThumb = "/thumbnails/";
   

    //var queryURL = "https://wger.de/api/v2/exerciseimage/4/thumbnails/";
    var queryURL = "https://wger.de/api/v2/exerciseimage/";
    //var queryURL = "https://wger.de/api/v2/exerciseinfo/";
    
    queryURL += searchID;
    queryURL += searchThumb;

    console.log("queryURL");
    console.log(queryURL);
  
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "Authorization": "Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa" } 
    })
    .then(function(response) {
        console.log("response");
        console.log(response);

      if (Object.keys(response).length > 0){
        
          //console.log(Object.keys(response).length);
          // console.log("response = PASS");
          // console.log(response);
          wodImageObject = response;
          
          for (key in wodImageObject ){
              if ( key == "small_cropped"){
                  //console.log("key");
                  //console.log(wodImageObject[key]);
                  resultsImages = wodImageObject[key].url;
                  //console.log(resultsImages);
                  //imgParser(resultsImages);
                }
            }
        }
        else {
            fail++
            //console.log("fail: " + fail)
        }

      //var newFlex = $("<div class='zom flex-grow'>");
      
     // stuff.data.forEach(function(wodObject) {
        
        // btnData = $('<button>').text(cuisines); 
  
        // addSavBtn.attr({
        //   'data-btnid': resultID,
        //   'class':'btn btn-info btn-xs',
        //   "data-toggle": "modal",
        //   'data-target':'.foodsave'
        // });
        // p1.append(addSavBtn)
        // restaurantData.append(p1);
        // newFlex.append(btnData);
        // $( btnData ).after(function() {
        //   return restaurantData;
        // });
        //$("#results").append( resultsImages )
     // })
    });
  }

  function imgParser (inUrl){
    urlStrIn = inUrl;
    
    newUrlObj = urlStrIn.split("/", 6)
    
    for (key in newUrlObj){
        if (key == "5"){
            
            idAfter = newUrlObj[key];
            newIdInt = parseInt(idAfter);        
            console.log("urlStrIn")
            console.log(urlStrIn)

            // wishObj = {
            //   [newIdInt] : urlStrIn
            // }

            //getXData(newIdInt, urlStrIn);
            // console.log("wishObj")
            // console.log(wishObj)
        }
    }

  }




