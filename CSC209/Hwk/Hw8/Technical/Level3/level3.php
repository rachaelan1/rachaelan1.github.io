<?php
    $IMAGES = glob("./images/*.jpg");

    function formatFilename($filename) {
        $filename = preg_replace('/(?<!\s)([A-Z])/', ' $1', $filename);
        return ucwords(trim($filename));
    }
?>

<body>

<select id="imageSelector">
    <option value="">-- Select an Image --</option>
    <?php
        foreach ($IMAGES as $index => $imagePath) {
            $filename = pathinfo($imagePath, PATHINFO_FILENAME);
            $formattedName = formatFilename($filename);
            echo '<option value="img' . $index . '">' . $formattedName . '</option>';
        }
    ?>
</select>

<div id="image-container">
    <?php
        foreach ($IMAGES as $index => $imagePath) {
            echo '<img id="img' . $index . '" class="gallery-image" src="' . $imagePath . '" width="300" height="200">';
        }
    ?>
</div>

<script>
    const images = <?php echo json_encode($IMAGES); ?>;
</script>

<script src="js/script.js"></script>

</body>
