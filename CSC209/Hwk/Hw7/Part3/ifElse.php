<!DOCTYPE html>
<html>
<body>

<?php
echo "<h2>If</h2>";

$t = 14;

if ($t < 20) {
  echo "Have a good day!";
}

echo "<h2>If Operators</h2>";

$a = 5;

if ($a == 2 || $a == 3 || $a == 4 || $a == 5 || $a == 6 || $a == 7) {
  echo "$a is a number between 2 and 7";
}

echo "<h2>If...Else</h2>";

$t = date("H");
echo "<p>The hour (of the server) is " . $t; 
echo ", and will give the following message:</p>";

if ($t < "10") {
  echo "Have a good morning!";
} elseif ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}

echo "<h2>Shorthand If</h2>";

$a = 13;

$b = $a < 10 ? "Hello" : "Good Bye";

echo $b;

echo "<h2>Nested If</h2>";

$a = 13;

if ($a > 10) {
  echo "Above 10";
  if ($a > 20) {
    echo " and also above 20";
  } else {
    echo " but not above 20";
  }
}
?>
 
</body>
</html>