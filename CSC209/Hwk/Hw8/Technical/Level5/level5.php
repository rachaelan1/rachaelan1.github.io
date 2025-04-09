<head>
    <link rel="stylesheet" href="css/style.css">
</head>

<?php
$IMAGES = glob("./images/*.jpg");
$numImages = count($IMAGES); 

function formatFilename($filename) {
    $filename = preg_replace('/(?<!\s)([A-Z])/', ' $1', $filename);
    return ucwords(trim($filename));
}

$captions = [];
foreach ($IMAGES as $imagePath) {
    $filename = pathinfo($imagePath, PATHINFO_FILENAME);
    $captions[] = formatFilename($filename);
}
?>

<?php
echo '<div class="slideshow-container" id="slideshow">';
    foreach ($IMAGES as $index => $imagePath) {
        $currentSlide = $index + 1;
        echo '<div class="mySlides">';
        echo '<div class="numberText">' . $currentSlide . ' / ' . $numImages . '</div>'; 
        echo '<img src="' . $imagePath . '" style="width:100%">';
        echo '<div class="text">' . $captions[$index] . '</div>';
        echo '</div>';
    }
?>

    <a class="prev" onclick="plusSlides(-1)">&lt;</a>
    <a class="next" onclick="plusSlides(1)">&gt;</a>

<?php echo "</div>"; ?>

<br>

<?php echo '<div style="text-align:center;">';
        for ($i = 1; $i <= $numImages; $i++) {
            echo '<span class="dot" onclick="currentSlide(' . $i . ')"></span> ';
        }
echo "</div>"; ?>

<script src="js/script.js" defer></script>