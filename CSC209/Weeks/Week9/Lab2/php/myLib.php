<?php
function extractFolderNumber($path) {
    $basename = basename($path);
    $weekNrString = substr($basename, -1);

    if (is_numeric($weekNrString)) {
        $weekNr = (int)$weekNrString;
    }

    return $weekNr;
}
?>