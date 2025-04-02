<!DOCTYPE html>
<html>
<body>

<?php
$x = "John";
echo "Hello $x";

echo "<br>";

echo 'Hello $x';

echo "<br>";

$x = "Hello World!";
echo str_replace("World", "Dolly", $x);

echo "<br>";

$x = "Hello World!";
$y = explode(" ", $x);

//Use the print_r() function to display the result:
print_r($y);

echo "<br>";

$x = "Hello";
$y = "World";
$z = "$x $y";
echo $z;

echo "<br>";

$x = "Hi, how are you?";
echo substr($x, 5, -3);

echo "<br>";

$x = "We are the so-called \"Vikings\" from the north.";
echo $x;
?>

</body>
</html>