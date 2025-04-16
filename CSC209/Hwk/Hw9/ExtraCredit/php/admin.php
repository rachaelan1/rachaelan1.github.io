<?php
$jsonFile = "../output/users.json";

if (file_exists($jsonFile)) {
    $data = json_decode(file_get_contents($jsonFile), true);

    $totalUsers = count($data);
    $remembered = count(array_filter($data, function ($u) {
        return $u["remember"] === "Yes";
    }));

    echo "Number of usernames: $totalUsers<br>";
    echo "Number of users who selected 'Remember me': $remembered<br><br>";
    echo "Usernames:<br>";
    foreach ($data as $user) {
        echo "- " . htmlspecialchars($user["username"]) . "<br>";
    }
} else {
    echo "No user data found.";
}
?>