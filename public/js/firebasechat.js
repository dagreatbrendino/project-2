// -------------------------FIREBASE CHAT---------------------------------------------------------------
// Initial Values
var groupName = "/group-name";
var messageBody = "";
var timestamp;

var reference;

var config = {
    apiKey: "AIzaSyAdhk8dTAIiaELTSvdmIoJlIkrXYffnX_4",
    authDomain: "pad-notes.firebaseapp.com",
    databaseURL: "https://pad-notes.firebaseio.com",
    projectId: "pad-notes",
    storageBucket: "pad-notes.appspot.com",
    messagingSenderId: "857111139984" 
  };
  firebase.initializeApp(config);
  
// Create a variable to reference the database.
var dataRef = firebase.database();

// Capture Button Click
$(document).on("click", "#add-user", function (event) {
    event.preventDefault();

    console.log($(this).data("group-id"));
    groupName = `/group-name-${$(this).data("group-id")}`


    // Grabs values from text-boxes
    // groupName = $("#groupName-input").val().trim();
    messageBody = $("#messageBody-form-input").val().trim();
    console.log(groupName);
    console.log(messageBody);
    console.log($("#messageBody-form-input"));


    // Code for the push TO firebase; object holding key value pairs to push to firebase
    dataRef.ref(groupName).push({

        //hold values we want to pass in 
        groupName: groupName,
        messageBody: messageBody,
        // timestamp: firebase.database.ServerValue.TIMESTAMP

    });
    $("#chat-table").empty();

// Firebase watcher + initial loader-- this code behaves similarly to .on("value")
dataRef.ref(groupName).on("child_added", function (childSnapshot) {

    // var groupName = childSnapshot.val().groupName;
    var messageBody = childSnapshot.val().messageBody;
    // var timestamp = childSnapshot.val().timestamp;
   
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().groupName);
    console.log(childSnapshot.val().messageBody);

    // Create the new row
    var newRow = $("<p>").append(
        // $("<p>").text(groupName),
        $("<p>").text(messageBody),
        // $("<span>").text(timestamp),
      );
      // Append the new row to the table
      $("#chat-table").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

});

