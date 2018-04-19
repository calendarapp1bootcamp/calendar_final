var eid = ""; 
var etype = ""; 

$( window ).on( "load", function() {

  var usStates = [
    { name: 'ALABAMA', abbreviation: 'AL'},
    { name: 'ALASKA', abbreviation: 'AK'},
    { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
    { name: 'ARIZONA', abbreviation: 'AZ'},
    { name: 'ARKANSAS', abbreviation: 'AR'},
    { name: 'CALIFORNIA', abbreviation: 'CA'},
    { name: 'COLORADO', abbreviation: 'CO'},
    { name: 'CONNECTICUT', abbreviation: 'CT'},
    { name: 'DELAWARE', abbreviation: 'DE'},
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
    { name: 'FLORIDA', abbreviation: 'FL'},
    { name: 'GEORGIA', abbreviation: 'GA'},
    { name: 'GUAM', abbreviation: 'GU'},
    { name: 'HAWAII', abbreviation: 'HI'},
    { name: 'IDAHO', abbreviation: 'ID'},
    { name: 'ILLINOIS', abbreviation: 'IL'},
    { name: 'INDIANA', abbreviation: 'IN'},
    { name: 'IOWA', abbreviation: 'IA'},
    { name: 'KANSAS', abbreviation: 'KS'},
    { name: 'KENTUCKY', abbreviation: 'KY'},
    { name: 'LOUISIANA', abbreviation: 'LA'},
    { name: 'MAINE', abbreviation: 'ME'},
    { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
    { name: 'MARYLAND', abbreviation: 'MD'},
    { name: 'MASSACHUSETTS', abbreviation: 'MA'},
    { name: 'MICHIGAN', abbreviation: 'MI'},
    { name: 'MINNESOTA', abbreviation: 'MN'},
    { name: 'MISSISSIPPI', abbreviation: 'MS'},
    { name: 'MISSOURI', abbreviation: 'MO'},
    { name: 'MONTANA', abbreviation: 'MT'},
    { name: 'NEBRASKA', abbreviation: 'NE'},
    { name: 'NEVADA', abbreviation: 'NV'},
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
    { name: 'NEW JERSEY', abbreviation: 'NJ'},
    { name: 'NEW MEXICO', abbreviation: 'NM'},
    { name: 'NEW YORK', abbreviation: 'NY'},
    { name: 'NORTH CAROLINA', abbreviation: 'NC'},
    { name: 'NORTH DAKOTA', abbreviation: 'ND'},
    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
    { name: 'OHIO', abbreviation: 'OH'},
    { name: 'OKLAHOMA', abbreviation: 'OK'},
    { name: 'OREGON', abbreviation: 'OR'},
    { name: 'PALAU', abbreviation: 'PW'},
    { name: 'PENNSYLVANIA', abbreviation: 'PA'},
    { name: 'PUERTO RICO', abbreviation: 'PR'},
    { name: 'RHODE ISLAND', abbreviation: 'RI'},
    { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
    { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
    { name: 'TENNESSEE', abbreviation: 'TN'},
    { name: 'TEXAS', abbreviation: 'TX'},
    { name: 'UTAH', abbreviation: 'UT'},
    { name: 'VERMONT', abbreviation: 'VT'},
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
    { name: 'VIRGINIA', abbreviation: 'VA'},
    { name: 'WASHINGTON', abbreviation: 'WA'},
    { name: 'WEST VIRGINIA', abbreviation: 'WV'},
    { name: 'WISCONSIN', abbreviation: 'WI'},
    { name: 'WYOMING', abbreviation: 'WY' }
  ];

  var stateSelect = document.getElementById('state');

  for(var i = 0; i < usStates.length; i++) {
      var option = document.createElement("option");
      option.text = usStates[i].name;
      option.value = usStates[i].abbreviation;
      stateSelect.add(option);
  }

  $(document).on("click", "#citysubmit", findCity);

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

//var zomapi = a9f103698b4f0c331c939d53be137fea


function findCity(event) {
  event.preventDefault();

  var cityName = $("#cityinput").val().trim();
  //var serialInput = $( "form" ).serialize();
  
  if (cityName == "") {
    alert("CITY must be filled out");
    $("#cityhelp").text("CITY must be filled out");
    return false;
  }
  else{
    var cityClean = cityName.replace(" ", "+")
    var stateName = $("#state").find(":selected").text();
    var queryLocation = cityClean + "%2C" + stateName;
    $("#cityhelp").text("You entered: " + cityName + ", " + stateName);
  }

  //console.log(serialInput);
  console.log(cityName);
  console.log(cityClean);
  console.log(stateName);
  console.log(queryLocation);
  
  var queryURL = "https://developers.zomato.com/api/v2.1/locations?&query=";
  //var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=oakland%2CCalifornia";
  queryURL += queryLocation;
  
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: { "user-key": "a9f103698b4f0c331c939d53be137fea"} 
    
  })
  .then(function(response) {
    
    console.log(response);
      eid = response.location_suggestions["0"].city_id;
      etype = response.location_suggestions["0"].entity_type;
      
      callZom(eid,etype);
    });
  }

  function callZom(inEid, inEType) {

    searchEID = "entity_id=" + inEid + "&";
    searchETYPE = "entity_type=" + inEType + "&";
    var trend = "count=10&collection_id=1"
    var queryURL = "https://developers.zomato.com/api/v2.1/search?";
    
    queryURL += searchEID;
    queryURL += searchETYPE;
    queryURL += trend;

    console.log(queryURL);
  
    $.ajax({
      url: queryURL,
      method: "GET",
      headers: { "user-key": "a9f103698b4f0c331c939d53be137fea"} 
    })
    .then(function(response) {

      console.log("response");
      console.log(response);

      var newFlex = $("<div class='zom flex-grow'>");

      rrArray = response.restaurants;
      var newResultArray = [];
      for (i = 0; i < 10; i++){
        newResultArray.push(rrArray[i]);
      }
      
      newResultArray.forEach(function(zomObject) {

        var zomObjectMin = zomObject.restaurant;
        
        
        var restaurantData = $("<div>");
        var cuisines = zomObjectMin.cuisines;
        var resultName = zomObjectMin.name;
        var resultAddy = zomObjectMin.location.address;
        var resultCost = zomObjectMin.average_cost_for_two;
        var resultEventsURL = zomObjectMin.events_url;
        var resultPhotos = zomObjectMin.photos_url;

        var resultID = zomObjectMin.id;
        var catID = "#" + resultID;

        var cuisines = zomObjectMin.cuisines;
        var btnLink =  $('<a>').attr('href', resultPhotos);
        btnLink.html("Photos & Reviews" + "<br/>")

        var addSavBtn = $("<button>").text("Add Event");
        var p1 = $("<div class=opendetail>").html(resultName + "<br/>" + resultAddy + "<br/>" + "Cost for two: $" + resultCost + "<br/>");
  
        btnData = $('<button>').text(cuisines); 
  
        restaurantData.attr({
          'id': resultID,
          "class":"collapse"
        });
  
        btnData.attr({
          'type': 'button',
          'class': 'btn btn-foundfood btn-sm',
          "data-toggle":"collapse",
          "data-target": catID
        })
  
        addSavBtn.attr({
          'data-foodlink': btnLink,
          'data-foodname': resultName,
          'data-foodaddy': resultAddy,
          'class':'btn btn-info btn-xs',
          "data-toggle": "modal",
          'data-target':'#createEventModal'
        });

        p1.append(btnLink);
        p1.append(addSavBtn);
        restaurantData.append(p1);
        newFlex.append(btnData);
        $( btnData ).after(function() {
          return restaurantData;
        });
        $("#results").append( newFlex )
      })
    });
  }



