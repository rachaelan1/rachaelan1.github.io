/*
Animates the shapes for any selected number of shapes entered by the user
Includes the option to generate random positions, velocities, and colors
Includes a reset button to reset the circles back to their last generated positions for the points and velocities
Includes a trace checkbox option, which can be enabled/disabled by the user to show intermediate positions of all the points

Uses canvas to draw the shapes
Uses event listeners to generate random positions and velocities
and start the animation and 
and change the number of points 
and reset the animation when buttons are clicked

Uses if else statements to adjust the direction of the line
Uses an array to hold the colors for the 3 shapes
Uses a circle array to hold the positions and velocities of the circle elements
Uses classes to organize the code
Uses a for loop to easily adapt the code to draw as many circles as the user specifies
Uses setInterval to animate the circles
Uses canvas to redraw and record the circle at every position (trace)
*/

class CircleAnimation {
    constructor(canvasId, inputId, applyBtnId) {
        // gets the canvas element from the HTML element
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        // gets the user selected number of points from the HTML element
        this.inputField = document.getElementById(inputId);
        // gets the apply button element from the HTML element
        this.applyBtn = document.getElementById(applyBtnId);
        // gets the reset button element from the HTML element
        this.resetBtn = document.getElementById("resetAnimation");
        // gets the trace checkbox, which allows the user to enable/disable trace lines
        this.traceCheckbox = document.getElementById("traceCheckbox");
        // number of shapes
        this.NRPTS = 10;
        // number of steps 
        this.NRSTEPS = 100;
        // initializes an empty array to store circle objects
        this.circles = [];
        // keeps a record of each circle’s last known position
        this.lastPositions = [];

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
        
        // Adds an event listener to the button with ID "applyPoints":
        // When clicked, it redraws the circles with the new n number of points 
        this.applyBtn.addEventListener("click", () => this.updatePoints());

        // Adds an event listener to the "resetAnimation" button.
        // When clicked, it calls resetAnimation(), which reverts the circles to their last positions.
        this.resetBtn.addEventListener("click", () => this.resetAnimation());
    }

    createCircles() {
        // clears the circle array to store new objects 
        this.circles = [];
        // clears the lastPositions array to store new objects
        this.lastPositions = [];
        // clears trace records 
        this.tracePositions = [];

        for (let i = 0; i < this.NRPTS; i++) {
            const circle = {
                x: Math.random() * 480 + 10, // randomly generates a random X position 
                y: Math.random() * 480 + 10, // randomly generates a Y position
                dx: Math.random() > 0.5 ? 1 : -1, // randomly generates a X velocity direction
                dy: Math.random() > 0.5 ? 1 : -1, // randomly generates a Y velocity direction
                color: this.randomColors(), // assigns a random color
                steps: 0, // resets the number of steps
                interval: null // initializes interval for animation
            };
            this.circles.push(circle); // stores the generated circle in this.circles
            this.lastPositions.push({x: circle.x, y: circle.y, dx: circle.dx, dy: circle.dy}); // saves its initial position in this.lastPositions
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

        // if trace mode is enabled, draws past positions 
        if (this.traceCheckbox.checked) {
            this.tracePositions.forEach((posArray) => {
                posArray.forEach((pos) => {
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
                    this.ctx.strokeStyle = pos.color;
                    this.ctx.stroke();
                });
            });
        }

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

        // updates the last positions
        this.updateLastPositions();
        // clears trace records 
        this.tracePositions = [];

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

                    // if tracing is enabled, record its past positions 
                    if (this.traceCheckbox.checked) {
                        this.recordTracePositions(c);
                    }

                    // redraws the circles with the updated positions 
                    this.drawCircles();
                } else {
                    // animation stops when the number of steps is reached 
                    clearInterval(c.interval);
                }
            }, 20);
        });
    }

    updatePoints() {
        // gets the user entered number of points 
        const newNRPTS = parseInt(this.inputField.value);
        // checks if the number of points is positive and something has been entered 
        if (!isNaN(newNRPTS) && newNRPTS > 0) {
            // assigns the number of points to the new number 
            this.NRPTS = newNRPTS;
            // redraws the circles at randomly generated positions and velocities
            this.createCircles();
        } else {
            // sends an alert if the number entered is not positive or nothing has been entered
            alert("Please enter a valid positive number.");
        }
    }

    // resets circles to their last known positions
    resetAnimation() {
        this.circles.forEach((c, index) => {
            c.x = this.lastPositions[index].x;
            c.y = this.lastPositions[index].y;
            c.dx = this.lastPositions[index].dx;
            c.dy = this.lastPositions[index].dy;
            c.steps = 0;
        });

        // clears trace records 
        this.tracePositions = [];
        this.drawCircles();
    }

    // This function updates the lastPositions array, which stores the previous positions and velocity directions (dx and dy) of all circles before they start moving
    updateLastPositions() {
        this.circles.forEach((c, index) => {
            this.lastPositions[index] = {x: c.x, y: c.y, dx: c.dx, dy: c.dy};
        });
    }

    // keeps track of all the past positions of the circles as they move 
    recordTracePositions(circle) {
        // if the tracePositions array does not exist at the specific step
        if (!this.tracePositions[circle.steps]) {
            // initializes an empty array at that step
            this.tracePositions[circle.steps] = [];
        }
        // records the current position of the circle at that specific step
        this.tracePositions[circle.steps].push({ x: circle.x, y: circle.y, color: circle.color});
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas", "numPoints", "applyPoints");
};