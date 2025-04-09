let slideIndex = 1;

let images = window.phpImages;
let captions = window.phpCaptions;
let numImages = window.phpNumImages;

function loadSlides() {
    let slideshowContainer = document.getElementById("slideshow"); 

    for (let i = 0; i < numImages; i++) {
        let slideDiv = document.createElement("div");  
        slideDiv.className = "mySlides"; 

        let slideNum = document.createElement("div"); 
        slideNum.className = 'numberText';
        slideNum.textContent = `${i + 1} / ${numImages}`; 
        slideNum.style.color = 'white';
        slideNum.style.fontWeight = 'bold';

        let img = document.createElement("img"); 
        img.src = images[i]; 
        img.style = "width:100%" 
        img.alt = "Slide " + (i + 1); 

        let caption = document.createElement("div"); 
        caption.className = 'text';
        caption.textContent = captions[i]; 

        slideDiv.appendChild(caption);
        slideDiv.appendChild(img);
        slideDiv.appendChild(slideNum);

        slideshowContainer.appendChild(slideDiv);
    }

    showSlides(slideIndex); 
}
             
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides"); 
    let dots = document.getElementsByClassName("dot"); 
                
    if (slides.length === 0) {
        console.error("No elements found with class 'mySlides'");
        return;
    }

    if (n > slides.length) {slideIndex = 1} 
            
    if (n < 1) {slideIndex = slides.length}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    dots[slideIndex - 1].className += " active";

    slides[slideIndex - 1].style.display = "block";
}  

window.onload = loadSlides;