let squares = [];

function createShapes() {
    const numSquares = 5;

    const container = document.getElementById('myContainer');

    for (let i = 0; i < numSquares; i++) {
        const image = document.createElement('img');
    
        image.src = 'images/frog.png'

        const topPos = Math.floor(Math.random() * 350) + 'px'; 
        const leftPos = Math.floor(Math.random() * 350) + 'px'; 

        let deltaX = Math.random() > 0.5 ? 1 : -1; 
        let deltaY = Math.random() > 0.5 ? 1 : -1; 
                
        image.style.top = topPos;
        image.style.left = leftPos;
        image.style.width = "50px";
        image.style.height = "50px";
        image.style.position = 'absolute';
    
        container.appendChild(image);

        squares.push({element: image, leftPos, topPos, deltaX, deltaY });
    }
}

document.getElementById("startAnimationBtn").addEventListener("click", function() {
    moveSquares();
});

function moveSquares() {
    let speed = parseInt(document.getElementById("squareSpeed").value);

    squares.forEach(squareObj => {
        let {element} = squareObj;

        squareObj.posX = parseInt(element.style.left);
        squareObj.posY = parseInt(element.style.top);

        if (element.dataset.intervalId) {
            clearInterval(element.dataset.intervalId);
        }

        let stepId = setInterval(() => {
            if (squareObj.posX == 0 || squareObj.posX == 350 || squareObj.posY == 0 || squareObj.posY == 350) {
                clearInterval(stepId);
                return;
            } else {
                squareObj.posX += squareObj.deltaX;
                squareObj.posY += squareObj.deltaY;

                element.style.left = squareObj.posX + "px";
                element.style.top = squareObj.posY + "px";
            }
        }, speed);

        element.dataset.intervalId = stepId;
    })
}