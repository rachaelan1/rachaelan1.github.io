<?php
$filename = "../output/users.txt";

$file = fopen($filename, "r");
$usernames = [];
$rememberedUsers = 0;

while (($line = fgets($file)) !== false) {
    if (preg_match("/Username:\s*(.*?),\s*Password:.*?,\s*Remember me:\s*(Yes|No)/", $line, $matches)) {
        $usernames[] = $matches[1];
        if (trim($matches[2]) === "Yes") {
            $rememberedUsers++;
        }
    }
}

fclose($file);

echo "Number of usernames: " . count($usernames) . "<br>";
echo "Number of users who selected 'Remember me': $rememberedUsers<br><br>";
echo "Usernames:<br>";

foreach ($usernames as $name) {
    echo "- $name<br>";
}
?>