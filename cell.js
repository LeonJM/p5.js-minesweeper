function Cell(i,j,w) {
    //useful vars
    this.i = i;
    this.j = j;
    this.w = w;

    //position on canvas
    this.x = i*w;
    this.y = j*w;

    this.mine = false;
    this.clicked = false;

    this.marked = false;
    this.count = 0;
}

Cell.prototype.countNeighbours = function() {
    if (!this.mine) {
        var result = 0;
        for (var x = -1; x < 2; x ++) {
            for (var y = -1; y < 2; y ++) {
                //make sure grid isnt out of bounds.
                if (this.i + x < 0 || this.i + x >= cols || this.j + y < 0 || this.j + y >= rows) {
                    continue;
                }
                var temp = grid[this.i + x][this.j + y];
                if (temp.mine) {
                    result ++;
                }
            }
        }
        this.count = result;
    }
}

Cell.prototype.show = function() {
    if (this.marked) {
        fill(255,0,0);
    } else if (!this.marked) {
        fill(255);
    }
    rect(this.x, this.y, w, w);

    if (this.clicked) {
        if (this.mine) {
            ellipseMode(CORNER);
            fill(170);
            ellipse(this.x + w/5,this.y + w/5, 3*w/5, 3*w/5);
        } else {
            if (gameOver && this.marked) {
                noFill();
            } else {
                fill(170);
            }
            rect(this.x, this.y, w, w);
            textAlign(CENTER)
            fill(255);
            if (this.count != 0) {
                text(this.count,this.x + w/2, this.y + 2*w/3);
            }
        }
    }
}

Cell.prototype.clickCell = function() {
    this.clicked = true;
    if (this.count == 0 && !this.mine) {
        //flood fill
        for (var x = -1; x < 2; x ++) {
            for (var y = -1; y < 2; y ++) {
                //make sure grid isnt out of bounds.
                if (this.i + x < 0 || this.i + x >= cols || this.j + y < 0 || this.j + y >= rows) {
                    continue;
                }
                var temp = grid[this.i + x][this.j + y];
                if (!temp.clicked) {
                    temp.clickCell();
                }
            }
        }
    }
    if (this.mine) {
        //game over
        gameOver = true;
        for (var i = 0; i < cols; i ++) {
            for (var j = 0; j < rows; j ++) {
                grid[i][j].clicked = true;
            }
        }

    }
}

Cell.prototype.mark = function() {
    this.marked = true;
}

Cell.prototype.unmark = function() {
    this.marked = false;
}
