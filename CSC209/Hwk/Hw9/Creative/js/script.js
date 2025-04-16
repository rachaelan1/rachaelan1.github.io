// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("demo").innerHTML = this.responseText;
      }
    xhttp.open("GET", "../php/admin.php", true);
    xhttp.send();
}
  
function deleteUsers() {
    const confirmDelete = window.confirm("Are you sure you want to delete all users? This action cannot be undone.");
  
    if (confirmDelete) {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        document.getElementById("demo").innerHTML = this.responseText;
      }
      xhttp.open("GET", "../php/deleteUsers.php", true);
      xhttp.send();
    }
}
  
function sortUsersAZ() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("demo").innerHTML = this.responseText;
    }
    xhttp.open("GET", "../php/sortUsers.php", true);
    xhttp.send();
}