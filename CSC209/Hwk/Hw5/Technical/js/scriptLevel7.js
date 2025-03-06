class CircleAnimation {
    constructor(canvasId, inputId, applyBtnId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.inputField = document.getElementById(inputId);
        this.applyBtn = document.getElementById(applyBtnId);
        this.NRPTS = 10;
        this.NRSTEPS = 100;
        this.circles = [];

        this.init();
    }

    init() {
        this.createCircles();
        document.getElementById("randomLocations").addEventListener("click", () => this.randomizeCircles());
        document.getElementById("startAnimation").addEventListener("click", () => this.startAnimation());
        this.applyBtn.addEventListener("click", () => this.updatePoints());
    }

    createCircles() {
        this.circles = [];

        for (let i = 0; i < this.NRPTS; i++) {
            this.circles.push({
                x: Math.random() * 480 + 10,
                y: Math.random() * 480 + 10,
                dx: Math.random() > 0.5 ? 1 : -1,
                dy: Math.random() > 0.5 ? 1 : -1,
                color: this.randomColors(),
                steps: 0,
                interval: null
            });
        }

        this.drawCircles();
    }

    randomColors() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    drawCircles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let c of this.circles) {
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 10, 0, 2 * Math.PI);
            this.ctx.strokeStyle = c.color;
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(c.x, c.y);
            this.ctx.lineTo(c.x + c.dx * 15, c.y + c.dy * 15);
            this.ctx.stroke();
        }
    }

    randomizeCircles() {
        this.circles.forEach((c) => {
            c.x = Math.random() * 480 + 10;
            c.y = Math.random() * 480 + 10;
            c.dx = Math.random() > 0.5 ? 1 : -1;
            c.dy = Math.random() > 0.5 ? 1 : -1;
            c.steps = 0;
        });

        this.drawCircles();
    }

    startAnimation() {
        this.circles.forEach((c) => {
            c.interval = setInterval(() => {
                if (c.steps < this.NRSTEPS) {
                    c.x += c.dx;
                    c.y += c.dy;
                    c.steps++;

                    this.drawCircles();
                } else {
                    clearInterval(c.interval);
                }
            }, 20);
        });
    }

    updatePoints() {
        const newNRPTS = parseInt(this.inputField.value);
        if (!isNaN(newNRPTS) && newNRPTS > 0) {
            this.NRPTS = newNRPTS;
            this.createCircles();
        } else {
            alert("Please enter a valid positive number.");
        }
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas", "numPoints", "applyPoints");
};