<!DOCTYPE html>
<html>
<body>

<?php 

echo "<h2>While Loop</h2>";

$i = 0;

while ($i < 100) {
  $i+=10;
  echo "$i<br>";
}

echo "<h2>Do While Loop</h2>";

$i = 0;

do {
  $i++;
  if ($i == 3) continue;
  echo $i;
} while ($i < 6);

echo "<h2>For Loop</h2>";

for ($x = 0; $x <= 10; $x++) {
    if ($x == 3) break;
    echo "The number is: $x <br>";
}

echo "<h2>For Each Loop</h2>";

$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $x) {
  if ($x == "blue") continue;
  echo "$x <br>";
}
?>  

</body>
</html>