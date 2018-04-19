var config = {
			  apiKey: "AIzaSyDpYShILLjEU8NldDiMV6GjKDMkvkOEOtg",
		    authDomain: "calendar-app-134a7.firebaseapp.com",
		    databaseURL: "https://calendar-app-134a7.firebaseio.com",
		    projectId: "calendar-app-134a7",
		    storageBucket: "",
		    messagingSenderId: "885516367532"
			}

var mainapp = firebase.initializeApp(config);
var dataRef = firebase.database();
var eventsRef = dataRef.ref("events");