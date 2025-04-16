<button type="button" onclick="loadDoc()">Update Users</button>

<div id="demo">
</div>

<script>
function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("demo").innerHTML = this.responseText;
    }
  xhttp.open("GET", "admin.php", true);
  xhttp.send();
}
</script>