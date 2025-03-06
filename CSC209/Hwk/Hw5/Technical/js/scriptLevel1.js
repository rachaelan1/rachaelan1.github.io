class CircleAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.init();
    }

    init() {
        this.drawPoints();
    }

    drawPoints() {
        this.ctx.beginPath();
        this.ctx.arc(95,50,10,0,2*Math.PI);
        this.ctx.stroke();

        this.ctx.beginPath()
        this.ctx.moveTo(95, 50);
        this.ctx.lineTo(110, 65);
        this.ctx.stroke();           
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas");
};