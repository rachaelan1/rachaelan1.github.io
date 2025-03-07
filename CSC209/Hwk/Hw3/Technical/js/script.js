
        let slideIndex = 1; // keeps track of the current slide being displayed

        // Array of image URLs
        let images = ["images/presidentHouse.jpg", "images/paradisePond.jpg", "images/pondTrees.jpg"];

        // Array of image captions 
        let captions = ['Smith College President\'s House', 'View of Paradise Pond from Park House', 'View of Fall Trees Along Paradise Pond from Main Road'];

        // This function dynamically creates and adds slides to the HTML document 
        function loadSlides() {
            let slideshowContainer = document.getElementById("slideshow"); // selects the container where the slide will be inserted

            for (let i = 0; i < images.length; i++) {
                let slideDiv = document.createElement("div"); // creates a slide container 
                slideDiv.className = "mySlides"; // assigns it to the 'mySlides' css class

                let slideNum = document.createElement("div"); // create a div to display slide numbers
                slideNum.className = 'numberText';
                slideNum.textContent = `${i + 1} / ${images.length}`; // dynamically updates the slide number
                slideNum.style.marginLeft = "-170%";
                slideNum.style.marginTop = "-72%"; 
                slideNum.style.color = 'white';
                slideNum.style.fontWeight = 'bold';

                let img = document.createElement("img"); //creates an <img> tag
                img.src = images[i]; // sets the image source
                img.style = "width:100%" // ensures the image fills the slide width
                img.alt = "Slide " + (i + 1); // provides alternative text

                let caption = document.createElement("div"); // creates a div element to display caption text
                caption.className = 'text';
                caption.textContent = captions[i]; // sets the caption text content 

                // add caption, image, and slide number to slideDiv
                slideDiv.appendChild(caption);
                slideDiv.appendChild(img);
                slideDiv.appendChild(slideNum);

                // add slideDiv to slideshowContainer
                slideshowContainer.appendChild(slideDiv);
            }

            // calls the function to display the first slide
            showSlides(slideIndex); 
        }
             

        // This function is called when the next or previous buttons are clicked
        // It increases or decreases slideIndex and updates the display
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        // Dot navigation
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides"); // selects all slides
            let dots = document.getElementsByClassName("dot"); // selects all dots
                
            // if no slides exist, log an error and stop execution
            if (slides.length === 0) {
                console.error("No elements found with class 'mySlides'");
                return;
            }

            // If n is greater than the total slides, wrap around to slideIndex = 1;.
            if (n > slides.length) {slideIndex = 1} 
            
            // If n is less than 1, loop back to the last slide.
            if (n < 1) {slideIndex = slides.length}

            // hides all slides by setting display = none
            for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
            }

            // removes the active class from all dots
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }

            // makes only the current dot active 
            dots[slideIndex - 1].className += " active";

            // displays only the selected slide 
            slides[slideIndex - 1].style.display = "block";
        }  

        // runs loadSlides when the webpage finishes loading 
        window.onload = loadSlides;