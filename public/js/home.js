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
//UPDATE OPERATIONS
var currentlyEditing;
//BILLS
//the element that is currently being edited
//when a bill column is clicked
$(document).on("click", ".billColumn", function(event){
    event.preventDefault();
    //find the row element the column belongs to assign it to a variable
    var currentlyEditingParent = $(this).parent();
    //get the logged in user id
    var userId = $(".welcome").data("loggeduserid");
    //if the user is the creator of the bill, then switch the column to an input field
    if(userId === currentlyEditingParent.data("creatorid")){
        $(this).find("input").removeClass("hideThis");
        $(this).find("select").removeClass("hideThis");
        $(this).find("span").addClass("hideThis");
        $(this).find("input").focus();
        $(this).find("select").focus();
        //assign the column being updated to the currentlyEditing variable
        currentlyEditing = $(this);   
    }
})
//when a billColumn output loses focus
$(document).on("focusout", ".billColumn", function(){
    //change the column back to plain text
    $(this).find("input").addClass("hideThis");
    $(this).find("select").addClass("hideThis");
    $(this).find("span").removeClass("hideThis");
    //call the updateBill function
    updateBill( $(this).parent())

})
//updateBill function
var updateBill = function(currentlyEditingRow){
    var creatorId = currentlyEditingRow.data("creatorid");
    var billId = currentlyEditingRow.data("billid");
    //get all of the inputs from the row being updated
    var bill = {
        billName: currentlyEditingRow.find(".billNameEdit").val(),
        amount: currentlyEditingRow.find(".billAmountEdit").val(),
        month: currentlyEditingRow.find(".billMonthEdit").val()
    }
    //update the bill with route defined in the apiRoutes
    $.ajax({
        method: "PUT",
        url: "/bill/edit/" + creatorId + "/" + billId,
        data: {
            billName: bill.billName,
            amount: bill.amount,
            month: bill.month
        }
    }).then( function(data){
        console.log(data);
        currentlyEditingRow.find(".billName").text(data.billName);
        currentlyEditingRow.find(".billAmount").text(data.amount);
        currentlyEditingRow.find(".billMonth").text(data.month);
    })
}
//function to remove bill
$(document).on("click", ".removeBillButton", function(){
    var billRow = $(this).parent().parent();
    console.log(billRow)
    var billId = billRow.data("billid");
    $.ajax({
        method: "DELETE",
        url: "/bill/delete/" + billId
    }).then(function (data){
        billRow.remove();
    })
})
//CHORES
$(document).on("click", ".choreColumn", function(event){
    event.preventDefault();

    var currentlyEditingParent = $(this).parent();

    var userId = $(".welcome").data("loggeduserid");

    if(userId === currentlyEditingParent.data("creatorid")){
        $(this).find("input").removeClass("hideThis");
        $(this).find("span").addClass("hideThis");
        $(this).find("input").focus();
        //assign the column being updated to the currentlyEditing variable
        currentlyEditing = $(this);   
    }
})

$(document).on("focusout", ".choreColumn", function(){
    //change the column back to plain text
    $(this).find("input").addClass("hideThis");
    $(this).find("span").removeClass("hideThis");
    //call the updateChore function
    updateChore( $(this).parent())
})

var updateChore = function(currentlyEditingRow){
    var creatorId = currentlyEditingRow.data("creatorid");
    var choreId = currentlyEditingRow.data("choreid");
    //get all of the inputs from the row being updated
    var chore = {
        chore: currentlyEditingRow.find(".choreNameEdit").val(),
        complete: currentlyEditingRow.find(".choreComplete").is(":checked")
    }
    //update the bill with route defined in the apiRoutes
    $.ajax({
        method: "PUT",
        url: "/chore/edit/" + creatorId + "/" + choreId,
        data: {
            chore: chore.chore,
            complete: chore.complete
        }
    }).then( function(data){
        console.log(data);
        currentlyEditingRow.find(".choreName").text(data.chore);
        currentlyEditingRow.find(".choreComplete").text(data.complete);
    })
}

$(document).on("click", ".choreComplete", function(){
    console.log($(this).is(":checked"));
    var currentlyEditingParent = $(this).parent().parent().parent();
    console.log(currentlyEditingParent)
    updateChore(currentlyEditingParent);
});
$(document).on("click", ".removeChoreButton", function(){
    var choreRow = $(this).parent().parent();
    // console.log(billRow)
    var choreId = choreRow.data("choreid");
    $.ajax({
        method: "DELETE",
        url: "/chore/delete/" + choreId
    }).then(function (data){
        choreRow.remove();
    })
})

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