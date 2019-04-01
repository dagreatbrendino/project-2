//--------------------------------------------------------------------------------------------
// Initialize Firebase


var config = {
    apiKey: "AIzaSyAdhk8dTAIiaELTSvdmIoJlIkrXYffnX_4",
    authDomain: "pad-notes.firebaseapp.com",
    databaseURL: "https://pad-notes.firebaseio.com",
    projectId: "pad-notes",
    storageBucket: "pad-notes.appspot.com",
    messagingSenderId: "857111139984"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

// Create a variable to reference the database.
var dataRef = firebase.database();

// Initial Values
var groupName = "";
var messageBody = "";

// Capture Button Click
$(document).on("click", "#add-user", function (event) {
    event.preventDefault();

    // Grabs values from text-boxes
    groupName = $("#groupName-input").val().trim();
    messageBody = $("#messageBody-input").val().trim();

    // Code for the push TO firebase; object holding key value pairs to push to firebase
    dataRef.ref().push({

        //hold values we want to pass in 
        groupName: groupName,
        messageBody: messageBody,
        messageAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

// Firebase watcher + initial loader-- this code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {
    var groupName = childSnapshot.val().groupName;
    var messageBody = childSnapshot.val().messageBody;
    var messageAdded = childSnapshot.val().messageAdded;
   
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().groupName);
    console.log(childSnapshot.val().messageBody);
    console.log(childSnapshot.val().messageAdded);

    // Create the new row for chat
    var newMessage = $("#chat-table").append(
        $("#groupName-input").text(groupName),
        $("#messageBody-input").text(messageBody),
        $("#chat-time-right").text(messageAdded),
      );
      // Append the new row to the table
      $("#chat-table").append(newMessage);

      

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


