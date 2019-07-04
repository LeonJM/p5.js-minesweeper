var w = 20; //width of cells/grid
var x;
var cols;
var rows;

var percentile = 0.2; //possibility of mines on the board, 1 = 100% 0 = 0%
var canvasWidth = 400;
var canvasHeight = 400;

var gameOver = false;

function makeDoubleArray(x,y) {
    var arr = new Array(x);
    for (var i = 0; i < arr.length; i ++) {
        arr[i] = new Array(y);
    }
    return arr;
}

function setup() {
    createCanvas(canvasWidth + 1, canvasHeight + 1);
    cols = floor(width/w);
    rows = floor(height/w);
    grid = makeDoubleArray(cols,rows);

    //create cells
    for (var i = 0; i < cols; i ++) {
        for (var j = 0; j < rows; j ++) {
            grid[i][j] = new Cell(i,j,w);
            if (Math.random() < percentile) {
                grid[i][j].mine = true;
            }
        }
    }

    //check neighbours
    for (var i = 0; i < cols; i ++) {
        for (var j = 0; j < rows; j ++) {
            grid[i][j].countNeighbours();
        }
    }
}

function mousePressed() {
    //check
	//left click marked cells to unmark them
	//left click unmarked cells to reveal them
	//right click unmarked cells to mark them
    var x = floor(mouseX/w);
    var y = floor(mouseY/w);
    if (mouseButton == LEFT) {
        if (grid[x][y].marked) {
            grid[x][y].unmark();
        } else {
            //reveal the cell
            grid[x][y].clickCell();
        }
    }
    if (mouseButton == RIGHT) {
        if (!grid[x][y].marked) {
            grid[x][y].mark();
        }
        //if (grid[x][y].marked) {
            //grid[x][y].unmark();
        //}
    }
}

function draw() {
    for (var i = 0; i < cols; i ++) {
        for (var j = 0; j < rows; j ++) {
            grid[i][j].show();
        }
    }
}



