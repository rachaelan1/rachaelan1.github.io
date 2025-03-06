/*
This class draws 3 pairs of a circle and a line marked with different colors 
*/

class CircleAnimation {
    constructor(canvasId) {
       // gets the canvas element from the HTML element
       this.canvas = document.getElementById(canvasId);
       this.ctx = this.canvas.getContext("2d");
       this.ctx1 = this.canvas.getContext("2d");
       this.ctx2 = this.canvas.getContext("2d");

       // calls init to start the drawing process
       this.init();
    }

    // calls the method to draw the shapes 
    init() {
        this.drawPoints();
    }

    drawPoints() {
        // first pair of circle and line
        // draws the circle 
        // starts a new drawing path
        this.ctx.beginPath();
        // draws a full circle at (95, 50) with a radius of 10 pixels
        this.ctx.arc(95,50,10,0,2*Math.PI);
        // changes the stroke color to blue 
        this.ctx.strokeStyle = 'blue';
        this.ctx.stroke();
        
        // draws the line 
        // starts a new drawing path
        this.ctx.beginPath();
        // starts the line at (95, 50) or the center of the circle
        this.ctx.moveTo(95, 50);
        // ends the line at (110, 65)
        this.ctx.lineTo(110, 65);
        this.ctx.stroke();
        
        // second pair of circle and line
        // draws the circle 
        // starts a new drawing path
        this.ctx1.beginPath();
        // draws a full circle at (200, 100) with a radius of 10 pixels
        this.ctx1.arc(200,100,10,0,2*Math.PI);
        // changes the stroke color to purple
        this.ctx1.strokeStyle = 'purple';
        this.ctx1.stroke();

        // draws the line 
        // starts a new drawing path
        this.ctx1.beginPath();
        // starts the line at (200, 100) or the center of the circle
        this.ctx1.moveTo(200, 100);
        // ends the line at (185, 85)
        this.ctx1.lineTo(185, 85);
        this.ctx1.stroke();

        // third pair of circle and line
        // draws the circle 
        // starts a new drawing path
        this.ctx2.beginPath();
        // draws a full circle at (400, 300) with a radius of 10 pixels
        this.ctx2.arc(400,300,10,0,2*Math.PI);
        // changes the stroke color to green
        this.ctx2.strokeStyle = 'green';
        this.ctx2.stroke();

        // draws the line 
        // starts a new drawing path
        this.ctx2.beginPath();
        // starts the line at (400, 300) or the center of the circle
        this.ctx2.moveTo(400, 300);
        // ends the line at (415, 285)
        this.ctx2.lineTo(415, 285);
        this.ctx2.stroke();
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas");
};