class CircleAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.colors = ['blue', 'green', 'purple'];

        this.init();
    }

    init() {
        this.drawShapes();
        document.getElementById("randomLocations").addEventListener("click", () => this.drawShapes());
    }

    drawShapes() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.colors.length; i++) {
            let topPos = Math.floor(Math.random() * 495);
            let leftPos = Math.floor(Math.random() * 495);

            this.ctx.beginPath();
            this.ctx.arc(leftPos, topPos, 10, 0, 2 * Math.PI);
            this.ctx.strokeStyle = this.colors[i];
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(leftPos, topPos);

            if (i === 0) {
                this.ctx.lineTo(leftPos + 15, topPos + 15);
            } else if (i === 1) {
                this.ctx.lineTo(leftPos - 15, topPos - 15);
            } else {
                this.ctx.lineTo(leftPos + 15, topPos - 15);
            }

            this.ctx.stroke();
        }
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas");
};