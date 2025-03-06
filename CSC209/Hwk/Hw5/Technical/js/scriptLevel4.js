class CircleAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.colors = ['blue', 'green', 'purple'];
        this.NRPTS = 5;

        this.init();
    }

    init() {
        this.drawShapes();
        document.getElementById("randomLocations").addEventListener("click", () => this.redraw());
    }

    drawShapes() {
        for (let i = 0; i < this.NRPTS; i++) {
            let topPos = Math.floor(Math.random() * 495);
            let leftPos = Math.floor(Math.random() * 495);

            let deltaX = Math.random() > 0.5 ? 15 : -15;
            let deltaY = Math.random() > 0.5 ? 15 : -15;

            this.ctx.beginPath();
            this.ctx.arc(leftPos, topPos, 10, 0, 2 * Math.PI);
            this.ctx.strokeStyle = this.randomColor();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(leftPos, topPos);
            this.ctx.lineTo(leftPos + deltaX, topPos + deltaY);
            this.ctx.stroke();
        }
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawShapes();
    }

    randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas");
};