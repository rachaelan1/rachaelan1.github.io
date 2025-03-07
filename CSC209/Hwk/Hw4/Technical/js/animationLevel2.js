/*
This javascript randomly moves the positions of 5 blue squares across the canvas, with options to control the speed of the squares
*/

// initializes an empty array named squares that will hold objects representing each square along with its properties
let squares = [];

// creates and places the squares in the container 
function createShapes() {

    // declares the number of squares in the container
    const numSquares = 5;

    // selects the container element where the squares will be appended
    const container = document.getElementById('myContainer');

    for (let i = 0; i < numSquares; i++) {
        // creates a new div element
        const square = document.createElement('div');
    
        // the elements are given css elements: square shape and blue color
        square.classList.add('square', 'blue');

        // randomly generates X and Y positions within the canvas range
        const topPos = Math.floor(Math.random() * 350) + 'px'; 
        const leftPos = Math.floor(Math.random() * 350) + 'px'; 

        // randomly generates an X and Y direction
        let deltaX = Math.random() > 0.5 ? 1 : -1; 
        let deltaY = Math.random() > 0.5 ? 1 : -1; 
                
        // assigns the randomly generated X and Y positions, width and height, position, and color to style properties
        square.style.top = topPos;
        square.style.left = leftPos;
        square.style.width = "50px";
        square.style.height = "50px";
        square.style.position = 'absolute';
        square.style.backgroundColor = 'blue';
    
        // adds the square element to the container
        container.appendChild(square);

        // saves the properties of the individual square in squares
        squares.push({element: square, leftPos, topPos, deltaX, deltaY });
    }
}

// event listener for the button to start the animation
document.getElementById("startAnimationBtn").addEventListener("click", function() {
    moveSquares();
});

// animates the squares 
function moveSquares() {
    // gets the user selected speed of the squares 
    let speed = parseInt(document.getElementById("squareSpeed").value);

    // iterates through all the squares in the squares array
    squares.forEach(squareObj => {
        // destructures the element from squareObj
        let {element} = squareObj;

        // get the current X and Y positions
        squareObj.posX = parseInt(element.style.left);
        squareObj.posY = parseInt(element.style.top);

        // ensures the animation stops once the square reaches the edge of the canvas 
        if (element.dataset.intervalId) {
            clearInterval(element.dataset.intervalId);
        }

        // moves the square by one step every 20 milliseconds
        let stepId = setInterval(() => {
            // stops the animation when the square reaches the boundary of the canvas
            if (squareObj.posX == 0 || squareObj.posX == 350 || squareObj.posY == 0 || squareObj.posY == 350) {
                clearInterval(stepId);
                return;
            } else {
                // gets the new X and Y positions after incrementing the positions
                squareObj.posX += squareObj.deltaX;
                squareObj.posY += squareObj.deltaY;

                // updates the X and Y positions of the square
                element.style.left = squareObj.posX + "px";
                element.style.top = squareObj.posY + "px";
            }
        }, speed);

        // saves the interval ID in the square's dataset, allowing it to be cleared later if needed
        element.dataset.intervalId = stepId;
    })
}