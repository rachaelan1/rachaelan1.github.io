<?php

$IMAGES = glob("./images/*.jpg");
$numImages = count($IMAGES);

?>

<body>

<div id="image-container"></div>

<script>
    const images = <?php echo json_encode($IMAGES); ?>;
    const numImages = <?php echo $numImages; ?>;
</script>
    
<script src="js/script.js"></script>

</body>