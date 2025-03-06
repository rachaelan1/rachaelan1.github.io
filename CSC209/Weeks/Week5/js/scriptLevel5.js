const canvas = document.getElementById("myCanvas");

let colors = ['blue', 'green', 'purple'];
let NRSTEPS = 3;

drawShapes();

function drawShapes() {
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let topPos, leftPos;

    topPos = Math.floor(Math.random() * 495); 
    leftPos = Math.floor(Math.random() * 495); 

    ctx.beginPath();
    ctx.arc(leftPos, topPos,10,0,2*Math.PI);
    ctx.strokeStyle = colors[0];
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(leftPos, topPos);
    ctx.lineTo(leftPos + 15, topPos + 15);
    ctx.stroke();

    topPos = Math.floor(Math.random() * 495); 
    leftPos = Math.floor(Math.random() * 495); 

    ctx.beginPath();
    ctx.arc(leftPos, topPos,10,0,2*Math.PI);
    ctx.strokeStyle = colors[1];
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(leftPos, topPos);
    ctx.lineTo(leftPos - 15, topPos - 15);
    ctx.stroke()

    topPos = Math.floor(Math.random() * 495); 
    leftPos = Math.floor(Math.random() * 495); 

    ctx.beginPath();
    ctx.arc(leftPos, topPos,10,0,2*Math.PI);
    ctx.strokeStyle = colors[2];
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(leftPos, topPos);
    ctx.lineTo(leftPos + 15, topPos - 15);
    ctx.stroke()

}

document.getElementById("randomLocations").addEventListener("click", function() {
    drawShapes();
});

function randomColors() {
    for (let i = 0; i < colors.length; i++) {
        colors[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    
    drawShapes();
}