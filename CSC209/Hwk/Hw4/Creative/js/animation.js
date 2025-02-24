function createShapes() {
    // Number of squares to create
    const numSquares = 5;

    // Select the container element
    const container = document.getElementById('myContainer');

    // Loop to create the squares
    for (let i = 0; i < numSquares; i++) {
        // Create a div element for each square
        const image = document.createElement('img');
    
        image.src = 'images/frog.png'

        // Randomly generate the top and left positions
        const topPos = Math.floor(Math.random() * 350) + 'px'; // Random position between 0 and 350
        const leftPos = Math.floor(Math.random() * 350) + 'px'; // Random position between 0 and 350
                
        // Set the random top and left positions
        image.style.top = topPos;
        image.style.left = leftPos;
        image.style.width = "50px";
        image.style.height = "50px";
        image.style.position = 'absolute';
    
        // Append the square to the container
        container.appendChild(image);
    }
}

document.getElementById("startAnimationBtn").addEventListener("click", function() {
    moveSquares();
});

function moveSquares() {
    let squares = document.querySelectorAll("#myContainer img");
    let speed = parseInt(document.getElementById("squareSpeed").value);

    squares.forEach(square => {
        // Get initial positions from the style properties (if any)
        let posX = parseInt(square.style.left);
        let posY = parseInt(square.style.top);

        // Randomly generate direction for each square
        let deltaX = Math.random() > 0.5 ? 1 : -1; // Random direction (left or right)
        let deltaY = Math.random() > 0.5 ? 1 : -1; // Random direction (up or down)

        if (square.dataset.intervalId) {
            clearInterval(square.dataset.intervalId);
        }

        // Set up interval to move the square
        let stepId = setInterval(() => {
            // Check if square hits the boundaries and stop the movement
            if (posX == 0 || posX == 350 || posY == 0 || posY == 350) {
                clearInterval(stepId); // Stop the movement by clearing the interval
                return;
            } else {
                // Update position
                posX += deltaX;
                posY += deltaY;

                // Apply new position to the square
                square.style.left = posX + "px";
                square.style.top = posY + "px";
            }
        }, speed);

        square.dataset.intervalId = stepId; // Store interval ID
    })
}