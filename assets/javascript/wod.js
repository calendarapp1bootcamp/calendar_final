
var fail = 0;
var eid = ""; 
var etype = ""; 
var imageOrphanArray = [];
var wishObj = {};


$( window ).on( "load", function() {

  //list of available muscles from api
  var muscleGroup = [
    {category: 10, name: "category" , text : "Abs"},
    {category: 8, name: "category" , text : "Arms"},
    {category: 12, name: "category" , text : "Back"},
    {category: 14, name: "category" , text : "Calves"},
    {category: 11, name: "category" , text : "Chest"},
    {category: 9, name: "category" , text : "Legs"  },
    {category: 13, name: "category" , text :"Shoulders"}
  ];

  //create buttons for each muscle group
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

  $('#createEventModal').on('show.bs.modal', function (event) {
    var eventButton = $(event.relatedTarget) // Button that triggered the modal
    var eventName = eventButton.data('foodname') // Extract info from data-* attributes
    var eventAddy = eventButton.data('foodaddy') // Extract info from data-* attributes
    console.log(eventButton);
    var modal = $(this);
    modal.find('.modal-title').text('Add event for: ' + eventName);
    modal.find('#event-name').val(eventName);
    modal.find('#event-desc').val(eventAddy);
  })

});

//call for exercises-ids to wger
function workGetter(event) {

  event.preventDefault();
  var serialInput = $( "form" ).serialize();
  
  //check that muscle was choosen
  if (serialInput == "") {
    alert("MUSCLE/S must be choosen");
    $("#wodhelp").text("MUSCLE/S must be choosen");
    return false;
  }
  else{
      var queryURL = "https://wger.de/api/v2/exercise/?language=2&status=2&limit=5&";
      queryURL += serialInput;
      userChoiceDisplay = serialInput;
      $("#wodhelp").text("You entered: " + userChoiceDisplay);
  }

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "Authorization": "Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa" } 
    })
    .then(function(response) {
      resultsArray = response.results;
      resultsArray.forEach(function(wgerObj){
          workID = wgerObj.id;   
          getXData(workID);
      })
    });
  }


  //take the exercise-ids and get exercise info
  function getXData(inID) {
    
    var searchID = inID + "/";
    var queryURL = "https://wger.de/api/v2/exerciseinfo/";
    queryURL += searchID;
  
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "Authorization": "Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa" } 
    })
    .then(function(response) {

      //display results on the page
      if (Object.keys(response).length > 0){       

          wodObject = response;
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

        var addSavBtn = $("<button>").text("Add Event");
        displayHead = $("<div class='card-header'>").text( wodCat);
        displayBody = $("<div class='card-body'>");
        displayTitle = $("<h5 class='card-title'>").text( wodName);
        displayDesc = $("<p class='card-text'>").html( wodDesc );

        addSavBtn.attr({
          'data-foodname': wodCat,
          'data-foodaddy': wodDesc,
          'class':'btn btn-info btn-xs',
          "data-toggle": "modal",
          'data-target':'#createEventModal'
        });

        displayCard.append(displayHead);
        displayBody.append(displayTitle);
        displayBody.append(displayDesc);
        displayCard.append(displayBody);
        displayBody.append(addSavBtn);
        $("#wodresults").append( displayCard );
    });
  }

  //get images to display, NOT FUCTIONING
  function imageGetter(inImgID,) {

    var searchID = inImgID;
    var searchThumb = "/thumbnails/";
    var queryURL = "https://wger.de/api/v2/exerciseimage/";
    queryURL += searchID;
    queryURL += searchThumb;
  
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "Authorization": "Token 25a72c6fcb1ee3b9e5de1dd8def03a9e1a65cffa" } 
    })
    .then(function(response) {

      if (Object.keys(response).length > 0){
          wodImageObject = response;
          for (key in wodImageObject ){
              if ( key == "small_cropped"){
                  resultsImages = wodImageObject[key].url;
                }
            }
        }
        else {
            fail++
        }
    });
  }

  //get images to display, NOT FUCTIONING
  function imgParser (inUrl){
    urlStrIn = inUrl;
    newUrlObj = urlStrIn.split("/", 6)
    for (key in newUrlObj){
        if (key == "5"){  
            idAfter = newUrlObj[key];
            newIdInt = parseInt(idAfter);        
        }
    }

  }




