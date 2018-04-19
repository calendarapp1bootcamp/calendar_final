

const datePicker = datepicker('#datepicker');
const timePicker = $('#timepicker').timepicker();

$(document).on('click', '#save-changes', function() {
  event.preventDefault();
  var eventName = $('#event-name').val().trim();
  console.log('eventName: ' + eventName)
  var eventDate = $('#datepicker').val().trim();
  console.log('eventDate: ' + eventDate)
  var unixDate = moment(eventDate);
  var unixDateString = unixDate.valueOf()

  console.log('day: ' + unixDateString)
  console.log(typeof unixDateString)
  // console.log('moment.js object for day: ' + day)

  var eventTime = $('#timepicker').val().trim();
  console.log('eventTime: ' + eventTime)
  var eventDesc = $('#event-desc').val().trim();
  console.log('eventDesc: ' + eventDesc)
 
  var newEvent = {
    name: eventName,
    date: eventDate,
    unixdate: unixDateString,
    time: eventTime,
    description: eventDesc
  }
  // Uploads employee data to the database
  eventsRef.push(newEvent);
  // Clear out user input values in modal
  document.getElementById("event-name").value = '';
  document.getElementById("datepicker").value = '';
  document.getElementById("timepicker").value = '';
  document.getElementById("event-desc").value = '';
  // var form = $('#createEventForm')
  // form.reset();
  // Hide modal
  $('#createEventModal').modal('hide');
  return false;
});

function showAllEvents() {
  // Clear display
  var eventsContainer = $('.events')
  eventsContainer.empty();
  // Loop through users in order with the forEach() method. The callback
  // provided to forEach() will be called synchronously with a DataSnapshot
  // for each child:    
  var allEventsByDate = eventsRef.orderByChild('unixdate')
  allEventsByDate.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      console.log('key: ' + key)
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      console.log('childData: ' + childData)
      var eventName = childData.name
      var eventDate = childData.date
      var eventTime = childData.time
      var eventDesc = childData.description

      // Create new event div
      var eventDiv = $('<div class="event"></div>')

      var eventNameDiv = $('<div class="event-name"><span>' + eventName + '</span></div>')
      eventDiv.append(eventNameDiv)

      var eventDateDiv = $('<div class="event-date">' + '<i class="fas fa-calendar-alt"></i>' + '<span>' + eventDate + '</span></div>')
      eventDiv.append(eventDateDiv)

      var eventTimeDiv = $('<div class="event-time">' + '<i class="fas fa-clock"></i>' + '<span>' + eventTime + '</span></div>')
      eventDiv.append(eventTimeDiv)

      var eventDescDiv = $('<div class="event-desc">' + '<i class="fas fa-align-left"></i>' + '<span>' + eventDesc + '</span></div>')
      eventDiv.append(eventDescDiv)

      eventsContainer.append(eventDiv)
      
      // Update header
      $('.header').html('All Events')
    });
  });
}
// snapshot.forEach(function(childSnapshot) {
//  //Here you can access  childSnapshot.key
// });
// eventsRef.once('value', function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var eventName = childSnapshot.name;
//     var eventDate = childSnapshot.date;
//     var eventTime = childSnapshot.time;
//     var eventDesc = childSnapshot.desc;
//     var eventData = childSnapshot.val();
//     console.log ('eventData: ' + eventData)
//     eventNameDiv = $('<div id="event-name">' + eventName + '</div>')
//     eventDateDiv = $('<div id="event-date">' + eventDate + '</div>')
//     eventTimeDiv = $('<div id="event-time">' + eventTime + '</div>')
//     eventNameDiv = $('<div id="event-name">' + eventName + '</div>')
//     var newEventDiv = $('<div class="event"></div>')
//     newEventDiv.append(event)
//   });
// });
// dataRef.ref().orderByChild('date').on('click', '#calLink', function(snapshot) {
//     console.log(snapshot.val())   
// });
$(document).on('click', '#calLink', function() {
  showAllEvents();
  // var allEvents =  {}
  // dataRef.ref().orderByChild("date").on("click" '#calLink', function(snapshot) {
});
// gameRef.on('value', function(function(gamesSnapshot) {
//    gamesSnapshot.forEach(function (snapshot) {
//        var obj = snapshot.val();
//        if(obj.isOnline == true) {
//            console.log(obj.name + " is online.");
//        }
//    }
// }); 
//