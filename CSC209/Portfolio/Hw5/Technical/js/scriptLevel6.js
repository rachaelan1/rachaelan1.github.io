/*
Animates the shapes for any selected number of shapes
Includes the option to generate random positions, velocities, and colors

Uses canvas to draw the shapes
Uses event listeners to generate random positions and velocities and start the animation when buttons are clicked
Uses if else statements to adjust the direction of the line
Uses an array to hold the colors for the 3 shapes
Uses a circle array to hold the positions and velocities of the circle elements
Uses classes to organize the code
Uses a for loop to easily adapt the code to draw as many circles as the user specifies
Uses setInterval to animate the circles
*/

class CircleAnimation {
    constructor(canvasId) {
        // gets the canvas element from the HTML element
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        // number of shapes
        this.NRPTS = 10;
        // number of steps
        this.NRSTEPS = 100;
        // initializes an empty array to store circle objects
        this.circles = [];

        // calls the function to set up the animation and event listeners
        this.init();
    }

    init() {
        // calls the function to initialize the circles at random positions 
        this.createCircles();

        // Adds an event listener to the button with ID "randomLocations":
        // When clicked, it calls randomizeCircles(), which randomly repositions the circles.
        document.getElementById("randomLocations").addEventListener("click", () => this.randomizeCircles());
        
        // Adds an event listener to the button with ID "startAnimation":
        // When clicked, it calls startAnimation(), which moves the circles step by step.
        document.getElementById("startAnimation").addEventListener("click", () => this.startAnimation());
    }

    createCircles() {
        // clears the circle array to store new objects 
        this.circles = [];

        for (let i = 0; i < this.NRPTS; i++) {
            this.circles.push({
                x: Math.random() * 480 + 10, // randomly generates a random X position 
                y: Math.random() * 480 + 10, // randomly generates a random Y position
                dx: Math.random() > 0.5 ? 1 : -1, // randomly generates a random X velocity direction
                dy: Math.random() > 0.5 ? 1 : -1, // randomly generates a random Y velocity direction
                color: this.randomColors(), // assigns a random color
                steps: 0, // resets the number of steps
                interval: null // initializes interval for animation
            });
        }

        // calls function to draw circles 
        this.drawCircles();
    }

    // returns a random hex color
    randomColors() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    // draws circles 
    drawCircles() {
        // clears the canvas 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draws each circle and matching line 
        for (let c of this.circles) {
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 10, 0, 2 * Math.PI);
            this.ctx.strokeStyle = c.color;
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(c.x, c.y);
            // line is 15 pixels long in the dx and dy direction 
            this.ctx.lineTo(c.x + c.dx * 15, c.y + c.dy * 15);
            this.ctx.stroke();
        }
    }

    randomizeCircles() {
        // reassigns randomly generated X and Y positions and velocity directions and resets the number of steps
        this.circles.forEach((c) => {
            c.x = Math.random() * 480 + 10;
            c.y = Math.random() * 480 + 10;
            c.dx = Math.random() > 0.5 ? 1 : -1;
            c.dy = Math.random() > 0.5 ? 1 : -1;
            c.steps = 0;
        });

        // redraws the circles with the updated positions and velocities 
        this.drawCircles();
    }

    startAnimation() {
        // loops through each circle and starts its animation
        this.circles.forEach((c) => {
            // starts a timer that updates the circle's position every 20 milliseconds 
            c.interval = setInterval(() => {
                // keeps running until the number of steps is reached
                if (c.steps < this.NRSTEPS) {
                    // updates the X and Y positions in the direction of the generated velocities
                    c.x += c.dx;
                    c.y += c.dy;

                    // increments the number of steps 
                    c.steps++;

                    // redraws the circles with the updated positions 
                    this.drawCircles();
                } else {
                    // animation stops when the number of steps is reached 
                    clearInterval(c.interval);
                }
            }, 20);
        });
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas");
};