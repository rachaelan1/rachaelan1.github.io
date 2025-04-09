<?php

$IMAGES = glob("./images/*.jpg");
$numImages = count($IMAGES);

for ($i = 0; $i < $numImages; $i++) {
    echo '<img src="' . $IMAGES[$i] .'" width="300" height="200">';
}

?>