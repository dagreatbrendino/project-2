$(document).ready(function() {
    // Getting references to the name input and bill container, as well as the table body
    var nameInput = $("#bill-name");
    var billList = $("tbody");
    var billContainer = $(".bill-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // a bill
    $(document).on("submit", "#bill-form", handlebillFormSubmit);
    $(document).on("click", ".delete-bill", handleDeleteButtonPress);
  
    // Getting the initial list of bills
    getbills();
  
    // A function to handle what happens when the form is submitted to create a new bill
    function handlebillFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertbill function and passing in the value of the name input
      upsertbill({
        name: nameInput
          .val()
          .trim()
      });
    }
  
    // A function for creating a bill. Calls getbills upon completion
    function upsertbill(billData) {
      $.post("/api/bills", billData)
        .then(getbills);
    }
  
    // Function for creating a new list row for bills
    function createbillRow(billData) {
      console.log(billData);
      var newTr = $("<tr>");
      newTr.data("bill", billData);
      newTr.append("<td>" + billData.name + "</td>");
      newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
      newTr.append("<td><a href='/blog?bill_id=" + billData.id + "'>Go to Posts</a></td>");
      newTr.append("<td><a href='/cms?bill_id=" + billData.id + "'>Create a Post</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-bill'>Delete bill</a></td>");
      return newTr;
    }
  
    // Retrieve bills and get them ready to be rendered to the page
    function getbills() {
      $.get("/api/bills", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createbillRow(data[i]));
        }
        renderbillList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of bills to the page
    function renderbillList(rows) {
      billList.children().not(":last").remove();
      billContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        billList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no bills
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create a bill before you can create a Post.");
      billContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("bill");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/bills/" + id
      })
        .then(getbills);
    }
  });
  