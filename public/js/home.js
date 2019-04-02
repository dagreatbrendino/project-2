$(document).ready(function () {
    $("#addGroceryButton").on("click", function (event) {
        event.preventDefault();
        var grocery = {
            groceryName: $("#grocery-name").val().trim(),
            quantity: $("#grocery-quantity").val().trim()
        };
        $.post("/grocery/add", {
            groceryName: grocery.groceryName,
            quantity: grocery.quantity
        }).then(function () {
            window.location.reload();
        });
    });
    $("#addChoreButton").on("click", function (event) {
        event.preventDefault();
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

    $(".billOwner").each(function(index){
        var userTotal = 0;
        var userId = $(this).data("userid");
        $(".billRow").each(function(ind){
            var billOwnerId = $(this).data("creatorid");
            if (userId === billOwnerId){
                userTotal += $(this).data("billamount");
            }
        })
        $("#user" + userId + "BillTotal").text("     $" + userTotal);
    })
});
//UPDATE OPERATIONS
var currentlyEditing;
var editing = false;
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
    if(userId === currentlyEditingParent.data("creatorid") && editing){
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
        currentlyEditingRow.find(".billName").text(data.billName);
        currentlyEditingRow.find(".billAmount").text(data.amount);
        currentlyEditingRow.find(".billMonth").text(data.month);
    })
}
//function to remove bill
$(document).on("click", ".removeBillButton", function(){
    var billRow = $(this).parent().parent();
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

    if(userId === currentlyEditingParent.data("creatorid") && editing){
        $(this).find("input").removeClass("hideThis");
        $(this).find("select").removeClass("hideThis")
        $(this).find("span").addClass("hideThis");
        $(this).find("input").focus();
        $(this).find("select").focus();
        //assign the column being updated to the currentlyEditing variable
        currentlyEditing = $(this);   
    }
})

$(document).on("focusout", ".choreColumn", function(){
    //change the column back to plain text
    $(this).find("input").addClass("hideThis");
    $(this).find("span").removeClass("hideThis");
    $(this).find("select").addClass("hideThis");
    //call the updateChore function
    updateChore( $(this).parent())
})

var updateChore = function(currentlyEditingRow){
    var creatorId = currentlyEditingRow.data("creatorid");
    var choreId = currentlyEditingRow.data("choreid");
    //get all of the inputs from the row being updated
    var chore = {
        chore: currentlyEditingRow.find(".choreNameEdit").val(),
        recurDate: currentlyEditingRow.find(".choreDayEdit").val(),
        complete: currentlyEditingRow.find(".choreComplete").is(":checked")
    }
    //update the bill with route defined in the apiRoutes
    $.ajax({
        method: "PUT",
        url: "/chore/edit/" + creatorId + "/" + choreId,
        data: {
            chore: chore.chore,
            recurDate: chore.recurDate,
            complete: chore.complete
        }
    }).then( function(data){
        currentlyEditingRow.find(".choreName").text(data.chore);
        currentlyEditingRow.find(".choreComplete").text(data.complete);
        currentlyEditingRow.find(".choreDay").text(data.recurDate)
    })
}

$(document).on("click", ".choreComplete", function(){
    var currentlyEditingParent = $(this).parent().parent().parent();
    updateChore(currentlyEditingParent);
});
$(document).on("click", ".removeChoreButton", function(){
    var choreRow = $(this).parent().parent();
    var choreId = choreRow.data("choreid");
    $.ajax({
        method: "DELETE",
        url: "/chore/delete/" + choreId
    }).then(function (data){
        choreRow.remove();
    })
})

//Grocery//
$(document).on("click", ".groceryColumn", function(event){
    event.preventDefault();

    var currentlyEditingParent = $(this).parent();

    var userId = $(".welcome").data("loggeduserid");

        if(editing){
            $(this).find("input").removeClass("hideThis");
            $(this).find("span").addClass("hideThis");
            $(this).find("input").focus();
            //assign the column being updated to the currentlyEditing variable
            currentlyEditing = $(this);   
        }
})

$(document).on("focusout", ".groceryColumn", function(){
    //change the column back to plain text
    $(this).find("input").addClass("hideThis");
    $(this).find("span").removeClass("hideThis");
    //call the updateChore function
    updateGrocery( $(this).parent())
})

var updateGrocery = function(currentlyEditingRow){
    var creatorId = currentlyEditingRow.data("creatorid");
    var groceryId = currentlyEditingRow.data("groceryid");
    //get all of the inputs from the row being updated
    var grocery = {
        groceryName: currentlyEditingRow.find(".groceryNameEdit").val(),
        quantity: currentlyEditingRow.find(".groceryQuantEdit").val()
    }
    console.log(grocery)
    //update the bill with route defined in the apiRoutes
    $.ajax({
        method: "PUT",
        url: "/grocery/edit/" + creatorId + "/" + groceryId,
        data: {
            groceryName: grocery.groceryName,
            quantity: grocery.quantity
        }
    }).then( function(data){
        console.log(data);
        currentlyEditingRow.find(".groceryName").text(data.groceryName);
        currentlyEditingRow.find(".groceryQuantity").text(data.quantity);
    })
}
$(document).on("click", ".editButton", function(){
    //if we aren't already editing
    if (!editing){
        editing = true;
        $(".editMessage").removeClass("hideThis");
        $(".removeButton").removeClass("hideThis")
        $(".editButton").text("Stop Editing")
        $(".editButton").addClass("btn-danger")
        $(".editButton").removeClass("btn-success")
    }
    else{
        editing=false;
        $(".editMessage").addClass("hideThis");
        $(".removeButton").addClass("hideThis")
        $(".editButton").text("Edit")
        $(".editButton").removeClass("btn-danger")
        $(".editButton").addClass("btn-success")
    }
})

$(document).on("click", ".removeGroceryButton", function(){
    var groceryRow = $(this).parent().parent();
    var groceryId = groceryRow.data("groceryid");
    $.ajax({
        method: "DELETE",
        url: "/grocery/delete/" + groceryId
    }).then(function (data){
        groceryRow.remove();
    })
});