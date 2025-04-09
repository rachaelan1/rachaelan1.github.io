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

<body onload="createSlideshow()">

    <div class="slideshow-container" id="slideshow">

        <a class="prev" onclick="plusSlides(-1)">&lt;</a>
        <a class="next" onclick="plusSlides(1)">&gt;</a>

    </div>

    <br>

    <div style="text-align:center;">
        <?php
            for ($i = 1; $i <= $numImages; $i++) {
                echo '<span class="dot" onclick="currentSlide(' . $i . ')"></span> ';
            }
        ?>
    </div>

<script>
    window.phpImages = <?php echo json_encode($IMAGES); ?>;
    window.phpCaptions = <?php echo json_encode($captions); ?>;
    window.phpNumImages = <?php echo json_encode($numImages); ?>;
</script>

<script src="js/script.js" defer></script>