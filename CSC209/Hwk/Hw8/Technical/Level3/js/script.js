document.addEventListener("DOMContentLoaded", function () {
    const selector = document.getElementById("imageSelector");
    const images = document.querySelectorAll(".gallery-image");

    images.forEach(img => img.style.display = "none");

    selector.addEventListener("change", function () {
        let selectedId = this.value;

        images.forEach(img => img.style.display = "none");

        if (selectedId) {
            document.getElementById(selectedId).style.display = "block";
        }
    });
});