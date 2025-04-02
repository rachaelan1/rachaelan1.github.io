<!DOCTYPE html>
<html>
<body>

<?php

$path = realpath("./");
echo "path: ". $path;
echo "<br>";
$basename = basename($path);
echo "basename: ". $basename;
echo "<br>";
$weekNrString = substr($basename, -1);
echo "week number: ". $weekNrString;
echo "<br>";

if (is_numeric($weekNrString)) {
    $weekNr = (int)$weekNrString;
}
?>

<p>This page figures out its whereabouts</p>

<?php

echo "My week number is " . $weekNr;

?>

</body>
</html>