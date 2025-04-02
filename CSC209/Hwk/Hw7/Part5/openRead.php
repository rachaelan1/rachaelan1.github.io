<!DOCTYPE html>
<html>
<body>

<?php
echo "<h2>fOpen</h2>";
$myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("webdictionary.txt"));

echo "<h2>Read Single Line</h2>";
$myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
echo fgets($myfile);

echo "<h2>Check End-Of-File</h2>";
while(!feof($myfile)) {
    echo fgets($myfile) . "<br>";
}

fclose($myfile);
?>

</body>
</html>