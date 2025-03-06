const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let colors = ['blue', 'green', 'purple'];

let NRPTS = 5;

//drawShapes();

/*
function drawShapes() {

    ctx.beginPath();
    ctx.arc(95,50,10,0,2*Math.PI);
    ctx.strokeStyle = colors[0];
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(95, 50);
    ctx.lineTo(110, 65);
    ctx.stroke();

    const ctx1 = canvas.getContext("2d");

    ctx1.beginPath();
    ctx1.arc(200,100,10,0,2*Math.PI);
    ctx1.strokeStyle = colors[1];
    ctx1.stroke();

    ctx1.beginPath()
    ctx1.moveTo(200, 100);
    ctx1.lineTo(185, 85);
    ctx1.stroke()

    const ctx2 = canvas.getContext("2d");

    ctx2.beginPath();
    ctx2.arc(400,300,10,0,2*Math.PI);
    ctx2.strokeStyle = colors[2];
    ctx2.stroke();

    ctx2.beginPath()
    ctx2.moveTo(400, 300);
    ctx2.lineTo(415, 285);
    ctx2.stroke()

}
*/

function drawShapes() {

    for (i = 0; i < NRPTS; i++) {
        const ctx = canvas.getContext("2d");

        const topPos = Math.floor(Math.random() * 495); 
        const leftPos = Math.floor(Math.random() * 495); 
    
        let deltaX = Math.random() > 0.5 ? 15 : -15; 
        let deltaY = Math.random() > 0.5 ? 15 : -15;
    
        ctx.beginPath();
        ctx.arc(leftPos, topPos, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = randomColors();
        ctx.stroke();
    
        ctx.beginPath();
        ctx.moveTo(leftPos, topPos);
        ctx.lineTo(leftPos + deltaX, topPos + deltaY);
        ctx.stroke();
    }
}

drawShapes();

document.getElementById("randomLocations").addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShapes();
});

function randomColors() {
    colors = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return colors;
}