class CircleAnimation {
    constructor(canvasId, inputId, applyBtnId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.inputField = document.getElementById(inputId);
        this.applyBtn = document.getElementById(applyBtnId);
        this.resetBtn = document.getElementById("resetAnimation");
        this.traceCheckbox = document.getElementById("traceCheckbox");
        this.NRPTS = 10;
        this.NRSTEPS = 100;
        this.circles = [];
        this.lastPositions = [];

        this.init();
    }

    init() {
        this.createCircles();
        document.getElementById("randomLocations").addEventListener("click", () => this.randomizeCircles());
        document.getElementById("startAnimation").addEventListener("click", () => this.startAnimation());
        this.applyBtn.addEventListener("click", () => this.updatePoints());
        this.resetBtn.addEventListener("click", () => this.resetAnimation());
    }

    createCircles() {
        this.circles = [];
        this.lastPositions = [];
        this.tracePositions = [];

        for (let i = 0; i < this.NRPTS; i++) {
            const circle = {
                x: Math.random() * 480 + 10,
                y: Math.random() * 480 + 10,
                dx: Math.random() > 0.5 ? 1 : -1,
                dy: Math.random() > 0.5 ? 1 : -1,
                color: this.randomColors(),
                steps: 0,
                interval: null
            };
            this.circles.push(circle);
            this.lastPositions.push({x: circle.x, y: circle.y, dx: circle.dx, dy: circle.dy});
        }

        this.drawCircles();
    }

    randomColors() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    drawCircles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

        this.updateLastPositions();
        this.tracePositions = [];
        this.drawCircles();
    }

    startAnimation() {
        this.circles.forEach((c) => {
            c.interval = setInterval(() => {
                if (c.steps < this.NRSTEPS) {
                    c.x += c.dx;
                    c.y += c.dy;
                    c.steps++;

                    if (this.traceCheckbox.checked) {
                        this.recordTracePositions(c);
                    }

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

    resetAnimation() {
        this.circles.forEach((c, index) => {
            c.x = this.lastPositions[index].x;
            c.y = this.lastPositions[index].y;
            c.dx = this.lastPositions[index].dx;
            c.dy = this.lastPositions[index].dy;
            c.steps = 0;
        });

        this.tracePositions = [];
        this.drawCircles();
    }

    updateLastPositions() {
        this.circles.forEach((c, index) => {
            this.lastPositions[index] = {x: c.x, y: c.y, dx: c.dx, dy: c.dy};
        });
    }

    recordTracePositions(circle) {
        if (!this.tracePositions[circle.steps]) {
            this.tracePositions[circle.steps] = [];
        }
        this.tracePositions[circle.steps].push({ x: circle.x, y: circle.y, color: circle.color});
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas", "numPoints", "applyPoints");
};