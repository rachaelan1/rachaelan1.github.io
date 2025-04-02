<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>

<?php
$firstNames = ["Rachael", "Lillian", "Joyce", "Robert", "Olivia", "Andy"];
$lastNames = ["An", "Miao", "An", "An", "Chang", "Lee"];
$ages = [25, 30, 35, 40, 45, 50];

$data = [
    "First Name" => $firstNames,
    "Last Name" => $lastNames,
    "Age" => $ages
];

define('NRCOLS', count($data));
define('NROWS', count($firstNames));

echo "<table>";
echo "<tr>";

for ($col = 0; $col < NRCOLS; $col++) {
    $header = array_keys($data)[$col];
    echo "<th>$header</th>";
}

echo "</tr>";

for ($row = 0; $row < NROWS; $row++) {
    echo "<tr>";
    for ($col = 0; $col < NRCOLS; $col++) {
        $columnKey = array_keys($data)[$col];
        echo "<td>";
        echo $data[$columnKey][$row];
        echo "</td>";
    }
    echo "</tr>";
}
echo "</table>";
?>

</body>
</html>