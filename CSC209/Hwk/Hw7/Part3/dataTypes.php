<!DOCTYPE html>
<html>
<body>

<?php
$x = 5;
var_dump($x);

echo "<br>";

$cars = array("Volvo","BMW","Toyota");
var_dump($cars);

echo "<br>";

class Car {
    public $color;
    public $model;
    public function __construct($color, $model) {
      $this->color = $color;
      $this->model = $model;
    }
    public function message() {
      return "My car is a " . $this->color . " " . $this->model . "!";
    }
  }
  
$myCar = new Car("red", "Volvo");
var_dump($myCar);
?>

</body>
</html>