/*
This class draws 3 different pairs of a circle and a line marked with different colors
It includes a "generate random locations" button to generate random locations for the shapes on the canvas

Uses canvas to draw the shapes
Uses event listeners to generate random positions and velocities when a button is clicked
Uses if else statements to adjust the direction of the line
Uses an array to hold the colors for the 3 shapes
Uses classes to organize the code
*/

class CircleAnimation {
    constructor(canvasId) {
        // gets the canvas element from the HTML element
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        // creates an array for the colors of the shapes
        this.colors = ['blue', 'green', 'purple'];

        // calls init to start the drawing process
        this.init();
    }

    init() {
        // calls the method to draw the shapes 
        this.drawShapes();
        // event listener for the "generate random locations" button 
        // calls the function to redraw the shapes when the button is clicked 
        document.getElementById("randomLocations").addEventListener("click", () => this.drawShapes());
    }

    drawShapes() {
        // clears the canvas before drawing new shapes 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // loops through each color
        for (let i = 0; i < this.colors.length; i++) {
            // generates random X and Y positions within the 495x495 range
            let topPos = Math.floor(Math.random() * 495);
            let leftPos = Math.floor(Math.random() * 495);

            // draws a circle with a radius of 10 pixels with the randomly generated positions
            this.ctx.beginPath();
            this.ctx.arc(leftPos, topPos, 10, 0, 2 * Math.PI);
            // assigns the circle the corresponding color
            this.ctx.strokeStyle = this.colors[i];
            this.ctx.stroke();

            // begins the line with the randomly generated positions 
            this.ctx.beginPath();
            this.ctx.moveTo(leftPos, topPos);

            // each circle gets assigned its own unique velocity
            if (i === 0) {
                // line moves diagonally down-right
                this.ctx.lineTo(leftPos + 15, topPos + 15);
            } else if (i === 1) {
                // line moves diagonally up-left
                this.ctx.lineTo(leftPos - 15, topPos - 15);
            } else {
                // line moves diagonally up-right
                this.ctx.lineTo(leftPos + 15, topPos - 15);
            }

            // draw the lines 
            this.ctx.stroke();
        }
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas");
};