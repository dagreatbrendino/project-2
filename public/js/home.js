$(document).ready(function () {
    // $("#addBillButton").on("click", function(event){
    //     event.preventDefault();
    //     console.log("adding bill")
    //     var bill = {
    //         billName: $("#bill-name").val().trim(),
    //         amount: $("#bill-amount").val().trim()
    //     };

    //     $.post("/bill/add",{
    //         billName: bill.billName,
    //         amount: bill.amount
    //     }).then(function(){
    //         window.location.reload();
    //     });
    // });
    $("#addGroceryButton").on("click", function (event) {
        event.preventDefault();
        console.log("adding grocery")
        var grocery = {
            groceryName: $("#grocery-name").val().trim(),
            quantity: $("#grocery-quantity").val().trim()
        };
        console.log(grocery);
        $.post("/grocery/add", {
            groceryName: grocery.groceryName,
            quantity: grocery.quantity
        }).then(function () {
            window.location.reload();
        });
    });
    $("#addChoreButton").on("click", function (event) {
        event.preventDefault();
        console.log("adding chores")
        var chore = {
            choreName: $("#chore-name").val().trim(),
            recurDate: $("#chore-day").val().trim()
        };

        $.post("/chore/add", {
            chore: chore.choreName,
            recurDate: chore.recurDate
        }).then(function () {
            window.location.reload();
        });
    });

});

// -------------------------FIREBASE CHAT---------------------------------------------------------------

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
console.log("initialize firebase");

// Create a variable to reference the database.
var dataRef = firebase.database();
console.log("connected to firebase");

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
    var newMessage = $("#chat-container").append(
        $("<p>").text(groupName),
        $("<p>").text(messageBody),
        $("<span>").text(messageAdded),
    );
    // Append the new chat to the container
    $(".chat-container").append(newMessage);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});