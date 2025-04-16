<html>
<body>

<?php
$username = $_POST["username"];
$password = $_POST["password"];
?>

Your username is <?php echo $username; ?><br>
Your password is <?php echo $password; ?>

<?php
$entry = "Username: $username, Password: $password\n";

$file = fopen("../output/users.txt","a");
fwrite($file, $entry);
fclose($file);
?>

</body>
</html>