<!DOCTYPE html>
<html>
<body>

<?php include 'php/myLib.php';
    $path = realpath("./");
    echo "This is work for Week " . extractFolderNumber($path);
?>

</body>
</html>