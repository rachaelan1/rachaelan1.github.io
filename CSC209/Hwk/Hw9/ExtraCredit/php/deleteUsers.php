<?php
$filename = "../output/users.json";
file_put_contents($filename, json_encode([], JSON_PRETTY_PRINT));
?>