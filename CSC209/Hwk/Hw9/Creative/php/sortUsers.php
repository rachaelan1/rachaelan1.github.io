<?php
$filename = "../output/users.txt";

$usernames = [];
$rememberedUsers = 0;

if (file_exists($filename)) {
    $file = fopen($filename, "r");

    while (($line = fgets($file)) !== false) {
        if (preg_match("/Username:\s*(.*?),\s*Password:.*?,\s*Remember me:\s*(Yes|No)/", $line, $matches)) {
            $usernames[] = $matches[1];
            if (trim($matches[2]) === "Yes") {
                $rememberedUsers++;
            }
        }
    }

    fclose($file);

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