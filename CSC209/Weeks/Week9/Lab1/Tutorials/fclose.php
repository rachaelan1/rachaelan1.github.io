<!DOCTYPE html>
<html>
<body>

<?php
echo "<h2>There is no output because this code just opens and closes a file.</h2>";
$file = fopen("test.txt","r");
fclose($file);
?>

</body>
</html>