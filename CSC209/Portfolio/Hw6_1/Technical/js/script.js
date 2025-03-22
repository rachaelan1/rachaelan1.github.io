/*
The Game of Life

Uses classes to organize the code
Uses a 2D array labeled with 0 or 1 to store the alive and dead cells in the grid
Uses event listeners to show the next generation, change the grid size, and select a pre-defined pattern
Uses if else statements to draw different patterns depending on the pattern selected by the user
Uses a for loop to loop through each element of the 2D array and fill it with black or white depending on its status
Dynamically updates the life status of the cell in the array depending on the number of neighbors
*/

(function() {
class GameGrid {
    // constructor initializes the grid 
    constructor(canvasId, rows, cols, cellSize) {
        this.canvasId = canvasId; // ID of the html <canvas> element
        this.rows = rows; // number of vertical boxes 
        this.cols = cols; // number of horizontal boxes
        this.cellSize = cellSize; // size of each grid cell in pixels
    }

    init() {

        // finds the canvas element by canvasId
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext("2d");

        // set canvas size based on grid dimensions and cell size
        this.canvas.width = this.cols * this.cellSize;
        this.canvas.height = this.rows * this.cellSize;

        // creates a 2D array and fills them all as "dead" cells or with 0
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        // draws the grid on the canvas 
        this.drawGrid();
        
        // event listener for the "next" button 
        document.getElementById("next").addEventListener("click", () => {
            // updates the grid to the next generation
            gameGrid.updateGrid();
        });

        // event listener for the "sizeSelect" dropdown
        document.getElementById("sizeSelect").addEventListener("change", (event) => {
            // updates the values corresponding to grid size based on the selected grid size
            this.changeGridSize(parseInt(event.target.value));
        });

        // event listener for the "patternSelect" dropdown
        document.getElementById("patternSelect").addEventListener("change", (event) => {
            // applies the selected pattern to the grid 
            gameGrid.setPattern(event.target.value);
        });

        const initialPattern = document.getElementById("patternSelect").value;
        this.setPattern(initialPattern);
    }

    // updates variables to resize grid and redraws the grid with the new size 
    changeGridSize(newSize) {
        // updates variables to resize grid 
        this.rows = newSize;
        this.cols = newSize;
        this.canvas.width = this.cols * this.cellSize;
        this.canvas.height = this.rows * this.cellSize;

        // clears the existing grid 
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        // Get the current selected pattern from the dropdown
        const selectedPattern = document.getElementById("patternSelect").value;
            
        // Reapply the pattern to the new grid size
        this.setPattern(selectedPattern);
        
        // redraws the grid 
        this.drawGrid();
    }

    setPattern(type) {
        // clears the grid before applying a new pattern
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        // defines starting positions for patterns 
        let startRow = 9;
        let startCol = 8;

        // updates the 2D array for the default pattern
        if (type === "default") {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow][startCol + 1] = 1;
            this.grid[startRow][startCol + 2] = 1;
            this.grid[startRow - 1][startCol + 2] = 1;
            this.grid[startRow - 2][startCol + 1] = 1;
        // updates the 2D array for the oscillating pattern
        } else if (type === "pattern1") {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow][startCol + 1] = 1;
            this.grid[startRow][startCol + 2] = 1;
            this.grid[startRow + 1][startCol + 1] = 1;
            this.grid[startRow + 2][startCol - 1] = 1;
            this.grid[startRow + 2][startCol + 3] = 1;
        // updates the 2D array for the beacon pattern
        } else if (type === 'beacon') {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow][startCol + 1] = 1;
            this.grid[startRow + 1][startCol] = 1;
            this.grid[startRow + 2][startCol + 3] = 1;
            this.grid[startRow + 3][startCol + 3] = 1;
            this.grid[startRow + 3][startCol + 2] = 1;
        // updates the 2D array for the blinker pattern
        } else if (type === 'blinker') {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow + 1][startCol] = 1;
            this.grid[startRow + 2][startCol] = 1;
        // updates the 2D array for the small spaceship pattern
        } else if (type === 'smallSpaceship') {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow - 1][startCol + 1] = 1;
            this.grid[startRow - 1][startCol + 2] = 1;
            this.grid[startRow - 1][startCol + 3] = 1;
            this.grid[startRow - 1][startCol + 4] = 1;
            this.grid[startRow][startCol + 4] = 1;
            this.grid[startRow + 1][startCol + 4] = 1;
            this.grid[startRow + 2][startCol + 3] = 1;
            this.grid[startRow + 2][startCol] = 1;
        // updates the 2D array for the acorn pattern
        } else if (type === 'acorn') {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow][startCol + 1] = 1;
            this.grid[startRow - 2][startCol + 1] = 1;
            this.grid[startRow - 1][startCol + 3] = 1;
            this.grid[startRow][startCol + 4] = 1;
            this.grid[startRow][startCol + 5] = 1;
            this.grid[startRow][startCol + 6] = 1;
        // updates the 2D array for the R-pentomino pattern
        } else if (type === 'pentomino') {
            this.grid[startRow][startCol] = 1;
            this.grid[startRow][startCol + 1] = 1;
            this.grid[startRow - 1][startCol + 1] = 1;
            this.grid[startRow + 1][startCol + 1] = 1;
            this.grid[startRow - 1][startCol + 2] = 1;
        }

        // redraws the grid after setting the pattern
        this.drawGrid();
    }

    // draws the grid on the canvas 
    drawGrid() {
        // clears the canvas before redrawing 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // loops through each cell
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // if the cell is alive, fill it with black
                // if the cell is dead, fill it with white 
                this.ctx.fillStyle = this.grid[row][col] ? "black" : "white";

                // fills the squares in with the corresponding color
                this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                
                // outlines the squares with gray
                this.ctx.strokeStyle = "gray";
                this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    // computes the next generation
    getNextGeneration() {
        // creates an empty grid 
        let newGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        // loops through each cell
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // counts the number of live neighbors 
                let neighbors = this.countLiveNeighbors(row, col);

                // live cell with 2 or 3 live neighbors stays alive
                if (this.grid[row][col] === 1) {
                    newGrid[row][col] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                // dead cell with 3 live neighbors becomes alive 
                } else {
                    newGrid[row][col] = (neighbors === 3) ? 1 : 0;
                }
            }
        }

        // return the array with the new values 
        return newGrid;
    }

    // counts the number of live neighbors of a given cell
    countLiveNeighbors(row, col) {
        // defines 8 possible neighbor positions 
        let directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        let count = 0;

        // loops through each direction and calculates new positions 
        for (let [dx, dy] of directions) {
            let newRow = row + dx;
            let newCol = col + dy;

            // checks if the neighbor is within bounds and counts live cells 
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                count += this.grid[newRow][newCol];
            }
        }

        // returns total live neighbors 
        return count;
    }

    // updates the grid for the next step
    updateGrid() {
        // replaces the current grid with the next generation 
        this.grid = this.getNextGeneration();
        // redraws the updated grid 
        this.drawGrid();
    }
}

// creates a 20x20 grid with a cell size of 20 pixels
const gameGrid = new GameGrid("gameCanvas", 20, 20, 20);

// initializes the game 
gameGrid.init();
})();