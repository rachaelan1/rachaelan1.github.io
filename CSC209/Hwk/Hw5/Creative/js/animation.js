class CircleAnimation {
    constructor(canvasId, inputId, applyBtnId, speedSelectId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.inputField = document.getElementById(inputId);
        this.applyBtn = document.getElementById(applyBtnId);
        this.resetBtn = document.getElementById("resetAnimation");
        this.traceCheckbox = document.getElementById("traceCheckbox");
        this.NRPTS = 10;
        this.NRSTEPS = 100;
        this.dogImage = new Image();
        this.dogImage.src = "images/dog.png"; 

        this.init();
    }

    init() {
        this.createDogs();
        document.getElementById("randomLocations").addEventListener("click", () => this.randomizeDogs());
        document.getElementById("startAnimation").addEventListener("click", () => this.startAnimation());
        this.applyBtn.addEventListener("click", () => this.updatePoints());
        this.resetBtn.addEventListener("click", () => this.resetAnimation());
    }

    createDogs() {
        this.dogs = [];
        this.lastPositions = [];
        this.tracePositions = [];

        for (let i = 0; i < this.NRPTS; i++) {
            const color = 'gray';

            const dog = {
                x: Math.random() * 400 + 50,
                y: Math.random() * 400 + 50,
                dx: Math.random() > 0.5 ? 1 : -1,
                dy: Math.random() > 0.5 ? 1 : -1,
                color: color,
                steps: 0,
                interval: null
            };
            this.dogs.push(dog);
            this.lastPositions.push({x: dog.x, y: dog.y, dx: dog.dx, dy: dog.dy});
        }

        this.drawDogs();
    }

    randomColors() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    drawDogs() {
        this.ctx.fillStyle = 'green';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.traceCheckbox.checked) {
            this.ctx.strokeStyle = "black"; 
            this.ctx.lineWidth = 1; 
        
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

        this.dogs.forEach(d => {
            this.ctx.drawImage(this.dogImage, d.x - 25, d.y - 25, 100, 100);
        });
    }

    randomizeDogs() {
        this.dogs.forEach(d => {
            d.x = Math.random() * 400 + 50;
            d.y = Math.random() * 400 + 50;
            d.dx = Math.random() > 0.5 ? 1 : -1;
            d.dy = Math.random() > 0.5 ? 1 : -1;
            d.steps = 0;

            if (d.trace) {
                d.trace.length = 0;
            }
        });

        this.updateLastPositions();
        this.drawDogs();
    }

    startAnimation() {
        this.dogs.forEach(d => {
            d.interval = setInterval(() => {
                d.x += d.dx;
                d.y += d.dy;

                if (d.x - 25 <= 0 || d.x + 70 >= this.canvas.width) {
                    d.dx *= -1;
                    d.dx += (Math.random() - 0.5) * 0.2;
                }
                if (d.y - 25 <= 0 || d.y + 70 >= this.canvas.height) {
                    d.dy *= -1;
                    d.dy += (Math.random() - 0.5) * 0.2;
                }

                if (this.traceCheckbox.checked) {
                    this.recordTracePositions(d);
                }

                this.drawDogs();
            }, 20);
        });
    }

    updatePoints() {
        const newNRPTS = parseInt(this.inputField.value);
        if (!isNaN(newNRPTS) && newNRPTS > 0) {
            this.dogs.forEach(d => clearInterval(d.interval));
            this.NRPTS = newNRPTS;
            this.createDogs();
        } else {
            alert("Please enter a valid positive number.");
        }
    }

    resetAnimation() {
        this.dogs.forEach((d, index) => {
            d.x = this.lastPositions[index].x;
            d.y = this.lastPositions[index].y;
            d.dx = this.lastPositions[index].dx;
            d.dy = this.lastPositions[index].dy;
            d.steps = 0;

            if (d.trace) {
                d.trace.length = 0;
            }
        });
        this.drawDogs();
    }

    updateLastPositions() {
        this.dogs.forEach((d, index) => {
            this.lastPositions[index] = { x: d.x, y: d.y, dx: d.dx, dy: d.dy};
        });
    }

    recordTracePositions(dog) {
        if (!dog.trace) {
            dog.trace = [];
        }
        dog.trace.push({ x: dog.x, y: dog.y });
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas", "numPoints", "applyPoints", "speedSelect");
};