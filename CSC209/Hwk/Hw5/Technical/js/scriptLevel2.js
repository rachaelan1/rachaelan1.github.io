class CircleAnimation {
    constructor(canvasId) {
       this.canvas = document.getElementById(canvasId);
       this.ctx = this.canvas.getContext("2d");
       this.ctx1 = this.canvas.getContext("2d");
       this.ctx2 = this.canvas.getContext("2d");

       this.init();
    }

    init() {
        this.drawPoints();
    }

    drawPoints() {
        this.ctx.beginPath();
        this.ctx.arc(95,50,10,0,2*Math.PI);
        this.ctx.strokeStyle = 'blue';
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(95, 50);
        this.ctx.lineTo(110, 65);
        this.ctx.stroke();
        
        this.ctx1.beginPath();
        this.ctx1.arc(200,100,10,0,2*Math.PI);
        this.ctx1.strokeStyle = 'purple';
        this.ctx1.stroke();

        this.ctx1.beginPath();
        this.ctx1.moveTo(200, 100);
        this.ctx1.lineTo(185, 85);
        this.ctx1.stroke();

        this.ctx2.beginPath();
        this.ctx2.arc(400,300,10,0,2*Math.PI);
        this.ctx2.strokeStyle = 'green';
        this.ctx2.stroke();

        this.ctx2.beginPath();
        this.ctx2.moveTo(400, 300);
        this.ctx2.lineTo(415, 285);
        this.ctx2.stroke();
    }
}

window.onload = function () {
    new CircleAnimation("myCanvas");
};