<!DOCTYPE HTML>
<html>  
<body>

<?php include 'php/myLib.php';
    $path = realpath("./");
    echo "This is work for Lab " . extractFolderNumber($path);
?>

<form action="php/saveUsers.php" method="post">
<br>
Username: <input type="text" name="username"><br>
Password: <input type="text" name="password"><br>
<input type="submit">
</form>

</body>
</html>