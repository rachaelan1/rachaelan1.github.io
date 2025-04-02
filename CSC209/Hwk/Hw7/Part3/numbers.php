<!DOCTYPE html>
<html>
<body>

<?php
// Check if the type of a variable is integer   
$x = 5985;
var_dump(is_int($x));

echo "<br>";

// Check if the type of a variable is float 
$x = 10.365;
var_dump(is_float($x));

echo "<br>";

// Cast float to int 
$x = 23465.768;
$int_cast = (int)$x;
echo $int_cast;
?>  

</body>
</html>