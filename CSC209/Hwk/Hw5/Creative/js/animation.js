/*
Animates dogs running across grass for any selected number of dogs entered by the user
Includes the option to generate random positions and velocities
Includes a reset button to reset the dogs back to their last generated positions for the points and velocities
Includes a trace checkbox option, which can be enabled/disabled by the user to show intermediate positions of all the points
*/

class CircleAnimation {
    constructor(canvasId, inputId, applyBtnId, speedSelectId) {
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
        // number of dogs
        this.NRPTS = 10;
        // number of steps
        this.NRSTEPS = 100;
        // creates a new image object to load the dog image 
        this.dogImage = new Image();
        // saves the path of the dog image
        this.dogImage.src = "images/dog.png"; 

        // calls the function to set up the animation and event listeners
        this.init();
    }

    init() {
        // calls the function to initialize the dogs at random positions
        this.createDogs();

        // Adds an event listener to the button with ID "randomLocations":
        // When clicked, it calls randomizeCircles(), which randomly repositions the circles.
        document.getElementById("randomLocations").addEventListener("click", () => this.randomizeDogs());
        
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

    createDogs() {
        // clears the dogs array to store new objects 
        this.dogs = [];
        // clears the lastPositions array to store new objects
        this.lastPositions = [];
        // clears trace records 
        this.tracePositions = [];

        for (let i = 0; i < this.NRPTS; i++) {
            const color = 'gray';

            const dog = {
                x: Math.random() * 400 + 50, // randomly generates an X position
                y: Math.random() * 400 + 50, // randomly generates a Y position
                dx: Math.random() > 0.5 ? 1 : -1, // randomly generates a X velocity direction
                dy: Math.random() > 0.5 ? 1 : -1, // randomly generates a Y velocity direction
                color: color, // assigns a gray color
                steps: 0, // resets the number of steps
                interval: null // initializes interval for animation
            };
            this.dogs.push(dog); // stores the generated circle in this.dogs
            this.lastPositions.push({x: dog.x, y: dog.y, dx: dog.dx, dy: dog.dy}); // saves its initial position in this.lastPositions
        }

        // calls function to draw circles 
        this.drawDogs();
    }

    // returns a random hex color
    randomColors() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    // draws dogs
    drawDogs() {
        this.ctx.fillStyle = 'green';
        // clears the canvas 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // if trace checkbox is checked 
        if (this.traceCheckbox.checked) {
            // sets the line style to black with a width of 1 for drawing the trace lines 
            this.ctx.strokeStyle = "black"; 
            this.ctx.lineWidth = 1; 
        
            // loops over each dog and draws its trace (if it exists and has more than one point) using the moveTo and lineTo methods to draw lines between the trace points
            this.dogs.forEach(dog => {
                if (dog.trace && dog.trace.length > 1) {
                    this.ctx.beginPath(); 
                    this.ctx.moveTo(dog.trace[0].x, dog.trace[0].y); 
                    
                    for (let i = 1; i < dog.trace.length; i++) {
                        this.ctx.lineTo(dog.trace[i].x, dog.trace[i].y);
                    }
    
                    this.ctx.stroke(); 
                }
            });
        }

        // loops over each dog and draws the dog image at its current position using drawImage
        this.dogs.forEach(d => {
            this.ctx.drawImage(this.dogImage, d.x - 25, d.y - 25, 100, 100);
        });
    }

    randomizeDogs() {
        // reassigns randomly generated X and Y positions and velocity directions
        this.dogs.forEach(d => {
            d.x = Math.random() * 400 + 50;
            d.y = Math.random() * 400 + 50;
            d.dx = Math.random() > 0.5 ? 1 : -1;
            d.dy = Math.random() > 0.5 ? 1 : -1;
            d.steps = 0;

            // clears the trace if it exists
            if (d.trace) {
                d.trace.length = 0;
            }
        });

        // updates the last generated positions 
        this.updateLastPositions();

        // redraws the dogs with the updated positions and velocities
        this.drawDogs();
    }

    startAnimation() {
        // loops through each circle and starts its animation
        this.dogs.forEach(d => {
            // starts a timer that updates the circle's position every 20 milliseconds
            d.interval = setInterval(() => {
                // updates the X and Y positions in the direction of the generated velocities
                d.x += d.dx;
                d.y += d.dy;

                // if the dog reaches the edge of the canvas, it bounces back by reversing its direction (dx or dy) and adds a small random factor to its direction
                if (d.x - 25 <= 0 || d.x + 70 >= this.canvas.width) {
                    d.dx *= -1;
                    d.dx += (Math.random() - 0.5) * 0.2;
                }
                if (d.y - 25 <= 0 || d.y + 70 >= this.canvas.height) {
                    d.dy *= -1;
                    d.dy += (Math.random() - 0.5) * 0.2;
                }

                // if tracing is enabled, record its past positions 
                if (this.traceCheckbox.checked) {
                    this.recordTracePositions(d);
                }

                // redraws the dogs at the updated positions
                this.drawDogs();
            }, 20);
        });
    }

    updatePoints() {
        // gets the user entered number of points 
        const newNRPTS = parseInt(this.inputField.value);
        // checks if the number of points is positive and something has been entered
        if (!isNaN(newNRPTS) && newNRPTS > 0) {
            // clears the existing dogs from the canvas if the user enters a new number of points
            this.dogs.forEach(d => clearInterval(d.interval));
            // assigns the number of points to the new number 
            this.NRPTS = newNRPTS;
            // redraws the dogs at randomly generated positions and velocities
            this.createDogs();
        } else {
            // sends an alert if the number entered is not positive or nothing has been entered
            alert("Please enter a valid positive number.");
        }
    }

    // resets circles to their last known positions
    resetAnimation() {
        this.dogs.forEach((d, index) => {
            d.x = this.lastPositions[index].x;
            d.y = this.lastPositions[index].y;
            d.dx = this.lastPositions[index].dx;
            d.dy = this.lastPositions[index].dy;
            d.steps = 0;

            // clears trace records 
            if (d.trace) {
                d.trace.length = 0;
            }
        });

        // redraws the dogs at their last known positions 
        this.drawDogs();
    }

    // This function updates the lastPositions array, which stores the previous positions and velocity directions (dx and dy) of all circles before they start moving
    updateLastPositions() {
        this.dogs.forEach((d, index) => {
            this.lastPositions[index] = { x: d.x, y: d.y, dx: d.dx, dy: d.dy};
        });
    }

    // keeps track of all the past positions of the dogs as they move 
    recordTracePositions(dog) {
        // ensures that the dog.trace array exists before attempting to push new positions into it
        if (!dog.trace) {
            dog.trace = [];
        }

        // pushes its current x and y positions to dog.trace
        dog.trace.push({ x: dog.x, y: dog.y });
    }
}

// when the page loads, it creates a new instance of CircleAnimation, triggering the constructor to initialize the canvas and draw the shapes
window.onload = function () {
    new CircleAnimation("myCanvas", "numPoints", "applyPoints", "speedSelect");
};