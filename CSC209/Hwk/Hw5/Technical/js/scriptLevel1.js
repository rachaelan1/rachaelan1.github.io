/*
This class draws a circle and line on a canvas
*/

class CircleAnimation {
    constructor(canvasId) {
        // gets the canvas element from the HTML element
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        // calls init to start the drawing process
        this.init();
    }

    // calls the method to draw the shapes 
    init() {
        this.drawPoints();
    }

    drawPoints() {
        // draws the circle 
        // starts a new drawing path
        this.ctx.beginPath();
        // draws a full circle at (95, 50) with a radius of 10 pixels
        this.ctx.arc(95,50,10,0,2*Math.PI);
        this.ctx.stroke();

        // draws the line 
        // starts a new drawing path
        this.ctx.beginPath()
        // starts the line at (95, 50) or the center of the circle
        this.ctx.moveTo(95, 50);
        // ends the line at (110, 65)
        this.ctx.lineTo(110, 65);
        this.ctx.stroke();           
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas");
};