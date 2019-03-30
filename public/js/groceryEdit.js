$(document).ready(function(){
    $("#editGroceryButton").on("click", function(event){
        event.preventDefault();
        var grocery = {
            groceryName: $("#grocery-name").val().trim(),
            quantity: $("#grocery-quantity").val().trim()
        };
        var groceryId = $("#editGroceryForm").data("groceryid");
        console.log(groceryId);
        var groceryGroup = $("#editGroceryForm").data("grocerygroup")
        $.ajax({
            method: "PUT",
            url: "/grocery/edit/" + groceryId,
            data: {
                groceryName: grocery.groceryName,
                quantity: grocery.quantity,
            }
        }).then(function(data){
            window.location.replace("/home")
        })

    });
    $("#removeGrocery").on("click", function(event){
        event.preventDefault();
        var groceryId = $("#editGroceryForm").data("groceryid");
        $.ajax({
            method: "DELETE",
            url: "/grocery/delete/" + groceryId
        }).then(function (data) { 
            window.location.replace("/home");
        })
    });
})
