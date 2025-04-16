<?php
$filename = "../output/users.json";

$usernames = [];
$rememberedUsers = 0;

if (file_exists($filename)) {

    $json = file_get_contents($filename);
    $data = json_decode($json, true);

    foreach ($data as $user) {
        if (isset($user['username'])) {
            $usernames[] = $user['username'];
            if (isset($user['remember']) && $user['remember'] === "Yes") {
                $rememberedUsers++;
            }
        }
    }

    sort($usernames);

    echo "Number of usernames: " . count($usernames) . "<br>";
    echo "Number of users who selected 'Remember me': $rememberedUsers<br><br>";
    echo "Usernames (sorted A–Z):<br>";
    foreach ($usernames as $name) {
        echo "- $name<br>";
    }
} else {
    echo "No users found.";
}
?>