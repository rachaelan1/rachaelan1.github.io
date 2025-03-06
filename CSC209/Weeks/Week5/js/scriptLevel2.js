const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(95,50,10,0,2*Math.PI);
ctx.strokeStyle = 'blue';
ctx.stroke();

ctx.beginPath()
ctx.moveTo(95, 50);
ctx.lineTo(110, 65);
ctx.stroke();

const ctx1 = canvas.getContext("2d");

ctx1.beginPath();
ctx1.arc(200,100,10,0,2*Math.PI);
ctx1.strokeStyle = 'purple';
ctx1.stroke();

ctx1.beginPath()
ctx1.moveTo(200, 100);
ctx1.lineTo(185, 85);
ctx1.stroke()

const ctx2 = canvas.getContext("2d");

ctx2.beginPath();
ctx2.arc(400,300,10,0,2*Math.PI);
ctx2.strokeStyle = 'green';
ctx2.stroke();

ctx2.beginPath()
ctx2.moveTo(400, 300);
ctx2.lineTo(415, 285);
ctx2.stroke()