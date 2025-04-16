<?php
$filename = "../output/users.txt";

$file = fopen($filename, "r");
$usernames = [];

while (($line = fgets($file)) !== false) {
    if (preg_match("/Username:\s*(.*?),/", $line, $matches)) {
        $usernames[] = $matches[1];
    }
}

fclose($file);

echo "Number of usernames: " . count($usernames) . "<br>";
echo "Usernames:<br>";

foreach ($usernames as $name) {
    echo "- $name<br>";
}
?>