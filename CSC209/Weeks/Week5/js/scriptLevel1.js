const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(95,50,10,0,2*Math.PI);
ctx.stroke();

ctx.beginPath()
ctx.moveTo(95, 50);
ctx.lineTo(110, 65);
ctx.stroke();