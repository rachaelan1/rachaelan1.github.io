<head>
    <link rel="stylesheet" href="css/style.css">
</head>

<?php
$baseDir = realpath(__DIR__ . "/images/") . "/";
$categories = array_filter(glob($baseDir . '*'), 'is_dir');

$categoryNames = array_map('basename', $categories);
$selectedCategory = isset($_GET['category']) && in_array($_GET['category'], $categoryNames) 
                    ? $_GET['category'] 
                    : reset($categoryNames);

$imagePaths = glob("$baseDir$selectedCategory/*.{jpg}", GLOB_BRACE);
$numImages = count($imagePaths); 

function formatFilename($filename) {
    $filename = preg_replace('/(?<!\s)([A-Z])/', ' $1', $filename);
    return ucwords(trim($filename));
}

$captions = [];
foreach ($imagePaths as $image) {
    $filename = pathinfo($image, PATHINFO_FILENAME);
    $captions[] = formatFilename($filename);
}
?>

<label for="category">Choose a City in Spain:</label>
    <select id="category" onchange="changeCategory()">
        <?php foreach ($categoryNames as $category): ?>
            <option value="<?= $category ?>" <?= ($category == $selectedCategory) ? 'selected' : '' ?>>
                <?= ucfirst($category) ?>
            </option>
        <?php endforeach; ?>
    </select>

<?php
echo '<div class="slideshow-container" id="slideshow">';
?>
    <?php foreach ($imagePaths as $index => $imagePath): ?>
        <div class="mySlides">
            <div class="numberText"><?= ($index + 1) . " / " . $numImages ?></div>
            <img src="<?= str_replace(realpath(__DIR__ . "/../"), "..", $imagePath) ?>" style="width:100%">
            <div class="text"><?= $captions[$index] ?></div>
        </div>
    <?php endforeach; ?>

    <a class="prev" onclick="plusSlides(-1)">&lt;</a>
    <a class="next" onclick="plusSlides(1)">&gt;</a>

<?php echo "</div>"; ?>

<br>

<?php echo '<div style="text-align:center;">';
        for ($i = 1; $i <= $numImages; $i++) {
            echo '<span class="dot" onclick="currentSlide(' . $i . ')"></span> ';
        }
echo "</div>"; 

?>

<script src="js/script.js" defer></script>