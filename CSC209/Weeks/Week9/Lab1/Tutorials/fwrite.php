<?php
echo "<h2>Writing to a New File</h2>";
$file = fopen("test1.txt","w");
echo fwrite($file,"Hello World. Testing!");
fclose($file);

echo "<h2>Writing to an Existing File</h2>";
$file = fopen("test2.txt","w");
echo fwrite($file,"Hello World. Testing!");
fclose($file);
?>