document.getElementById("moveRedBtn").addEventListener("click", function() {
    moveRed(); // Calls the moveRed() function when the button is clicked
});

// function to trigger the movement of the red square
function moveRed()
{   
    // select the red square by its id
    var redSquare = document.getElementById("redSq"); 
    // select the user selected speed of the red square
    var redSpeed = parseInt(document.getElementById("redSpeed").value);
    // set the position of the red square to the top left corner   
    var redPos = 0;
    // call the stepRed function at the user selected speed
    var stepRedId = setInterval(stepRed, redSpeed);

    // function to change the position of the red square 
    function stepRed() {

        // position of red square reaches the bottom right corner 
        if (redPos == 350) {
            // stop red square from moving 
            clearInterval(stepRedId);
        } else {
            // increment the position of the red square by 1
            redPos++; 

            // increase the bottom position of the red square
            redSquare.style.top = redPos + 'px'; 

            // increase the right position of the red square
            redSquare.style.left = redPos + 'px';
        }
    }
}

document.getElementById("moveBlueBtn").addEventListener("click", function() {
    moveBlue(); // Calls the moveBlue() function when the button is clicked
});

// function to trigger the movement of the blue square 
function moveBlue()
{   
    // select the blue square by its id
    var blueSquare = document.getElementById("blueSq"); 
    // select the user selected speed of the blue square
    var blueSpeed = parseInt(document.getElementById("blueSpeed").value);
    // set the position of the blue square to the bottom right corner   
    var bluePos = 350;
    // call the stepBlue function at the user selected speed 
    var stepBlueId = setInterval(stepBlue, blueSpeed);

    // function to change the position of the blue square 
    function stepBlue() {

        // position of blue square reaches the top left corner 
        if (bluePos == 0) {
            // stop blue square from moving 
            clearInterval(stepBlueId);
        } else {
            // decrement the position of the blue square by 1
            bluePos--; 

            // increase the top position of the blue square
            blueSquare.style.top = bluePos + 'px'; 

            // increase the left position of the blue square
            blueSquare.style.left = bluePos + 'px';
        }
    }
}


