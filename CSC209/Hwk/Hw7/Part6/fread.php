<!DOCTYPE html>
<html>
<body>

<?php
echo "<h2>Read 10 bytes from an open file</h2>";

$file = fopen("test.txt","r");
$content = fread($file,"10");
echo $content;
fclose($file);
?>

</body>
</html>