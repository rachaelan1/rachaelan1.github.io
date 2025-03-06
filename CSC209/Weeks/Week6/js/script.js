class GameGrid {
    constructor(canvasId, rows, cols, cellSize) {
        this.canvasId = canvasId;
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
    }

    init() {
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.cols * this.cellSize;
        this.canvas.height = this.rows * this.cellSize;

        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        this.setPattern();
        this.drawGrid();
        
        document.getElementById("next").addEventListener("click", () => {
            gameGrid.updateGrid();
        });
    }

    setPattern() {
        let startRow = Math.floor(this.rows/2);
        let startCol = Math.floor(this.cols/2);

        this.grid[startRow][startCol] = 1;       
        this.grid[startRow][startCol + 1] = 1;   
        this.grid[startRow][startCol + 2] = 1;  
        this.grid[startRow - 1][startCol + 2] = 1; 
        this.grid[startRow - 2][startCol + 1] = 1;
    }

    drawGrid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.ctx.fillStyle = this.grid[row][col] ? "black" : "white";
                this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                this.ctx.strokeStyle = "gray";
                this.ctx.strokeRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    getNextGeneration() {
        let newGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let neighbors = this.countLiveNeighbors(row, col);

                if (this.grid[row][col] === 1) {
                    newGrid[row][col] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
                } else {
                    newGrid[row][col] = (neighbors === 3) ? 1 : 0;
                }
            }
        }
        return newGrid;
    }

    countLiveNeighbors(row, col) {
        let directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        let count = 0;

        for (let [dx, dy] of directions) {
            let newRow = row + dx;
            let newCol = col + dy;

            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                count += this.grid[newRow][newCol];
            }
        }
        return count;
    }

    updateGrid() {
        this.grid = this.getNextGeneration();
        this.drawGrid();
    }
}

const gameGrid = new GameGrid("gameCanvas", 20, 20, 20);
gameGrid.init();