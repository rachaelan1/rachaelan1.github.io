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
$userData = array(
    "username" => $username,
    "password" => $password,
    "remember" => $remember
);

$jsonFile = "../output/users.json";

$existingData = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

$existingData[] = $userData;

file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT));
?>
</div>

</body>
</html>