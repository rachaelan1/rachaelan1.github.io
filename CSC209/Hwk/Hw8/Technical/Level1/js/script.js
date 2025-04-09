document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("image-container");

    for (let i = 0; i < numImages; i++) {
        let img = document.createElement("img");
        img.src = images[i];
        img.width = 300;
        img.height = 200;
        img.alt = "Image " + (i + 1);
        container.appendChild(img);
    }
});