/*
This class draws an arbitrary number of different pairs of a circle and a line
It includes a "generate random locations" button to generate random locations, velocities, and colors for the shapes on the canvas

Uses canvas to draw the shapes
Uses event listeners to generate random positions and velocities when a button is clicked
Uses if else statements to adjust the direction of the line
Uses an array to hold the colors for the 3 shapes
Uses classes to organize the code
Uses a for loop to easily adapt the code to draw as many circles as the user specifies
*/

class CircleAnimation {
    constructor(canvasId) {
        // gets the canvas element from the HTML element
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        // creates an array for the colors of the shapes
        this.colors = ['blue', 'green', 'purple'];
        // number of shapes 
        this.NRPTS = 5;

        // calls init to start the drawing process
        this.init();
    }

    init() {
        // calls the method to draw the shapes 
        this.drawShapes();
        // event listener for the "generate random locations" button 
        // calls the function to redraw the shapes when the button is clicked
        document.getElementById("randomLocations").addEventListener("click", () => this.redraw());
    }


    drawShapes() {
        // loops through the total number of shapes to draw each shape
        for (let i = 0; i < this.NRPTS; i++) {
            // generates random X and Y positions within the 495x495 range
            let topPos = Math.floor(Math.random() * 495);
            let leftPos = Math.floor(Math.random() * 495);

            let speed = Math.random() * 40 + 15;

            // generates random X and Y directions for velocities
            let deltaX = Math.random() > 0.5 ? 1 : -1;
            let deltaY = Math.random() > 0.5 ? 1 : -1;

            // draws the circle
            // draws the full circle with a radius of 10 pixels at the randomly generated positions
            this.ctx.beginPath();
            this.ctx.arc(leftPos, topPos, 10, 0, 2 * Math.PI);
            // assigns a random color to the circle
            this.ctx.strokeStyle = this.randomColor();
            this.ctx.stroke();

            // draws the line
            // draws the line based on the randomly generated velocities
            this.ctx.beginPath();
            this.ctx.moveTo(leftPos, topPos);
            this.ctx.lineTo(leftPos + (deltaX * speed), topPos + (deltaY * speed));
            this.ctx.stroke();
        }
    }

    // redraws the shapes
    redraw() {
        // clears the canvas before drawing the shapes 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // redraws the shapes at the new set of random positions and velocities
        this.drawShapes();
    }

    // returns a random hex color 
    randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas");
};