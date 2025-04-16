<head>
    <link rel="stylesheet" href="../css/saveUsers.css">
    <meta charset="UTF-8">
    <title>Login Confirmation</title>
</head>

<html>
<body>

<div class="container">
<?php
$username = $_POST["uname"];
$password = $_POST["psw"];
$remember = isset($_POST["remember"]) ? "Yes" : "No";
?>

<div class="login-result">
<?php
echo "Welcome $username!<br>";
echo "Your password is $password.<br>";

if ($remember === "Yes") {
    echo "Your login will be saved the next time you login!<br>";
} else {
    echo "Your login will NOT be saved the next time you login!<br>";
}
?>
</div>

<?php
$entry = "Username: $username, Password: $password, Remember me: $remember\n";

$file = fopen("../output/users.txt","a");
fwrite($file, $entry);
fclose($file);
?>
</div>

</body>
</html>