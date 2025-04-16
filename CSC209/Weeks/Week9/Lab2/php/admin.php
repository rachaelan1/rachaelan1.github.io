<?php
// COMMENTED CODE IS THE FAILED ATTEMPT FROM STEP 2

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
//$num = updateNumUsers($filename);
//echo "Updated number of usernames: " . $num . "<br>";
echo "Usernames:<br>";
foreach ($usernames as $name) {
    echo "- $name<br>";
}

/*
FAILED ATTEMPT
function updateNumUsers($filename) {
    $file = fopen($filename, "r");
    $usernames = [];

    while (($line = fgets($file)) !== false) {
        if (preg_match("/Username:\s*(.*?),/", $line, $matches)) {
            $usernames[] = $matches[1];
        }
    }

    fclose($file);

    $numUsernames = count($usernames);

    return $numUsernames;
}
*/
?>