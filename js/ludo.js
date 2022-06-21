// I am adding comments like 3 weeks after I finished the game. I'm sorry about this whole mess. 

class Tile{
    constructor(x,y,a,home,finish,start,number){
        this.x = x;
        this.y = y;
        this.a = a;
        this.number = number;
        if (home == false && finish == false && start == false){
            this.type = "board";
            this.color = "white";
        } else if (home != false){
            this.type = "home";
            this.color = home;
        } else if (finish != false){
            this.type = "finish";
            this.color = finish;
        } else if (start != false){
            this.type = "start";
            this.color = start;
        }
        // Each pawn is stored in the tile they are on.
        this.pawns = [];
        if (home != false){
            for (let i in players){
                // console.log(this.color == players[i].color)
                if (this.color == players[i].color){
                    // console.log("called")
                    this.pawns = [
                        new Pawn(home),
                        new Pawn(home),
                        new Pawn(home),
                        new Pawn(home)
                    ]
                }
            }
        }
        this.validMoves = [];
    };

    //Checks if a tile was clicked. If marked is empty and the tile is occupied by the current player the tile is added to "marked" (array) otherwise not. If "marked" has already an element then it is added anyways.
    clicked(x,y){
        // console.log(state)
        if (
        x > this.x*this.a && x < (this.x + 1)*this.a && 
        y > this.y*this.a && y < (this.y + 1)*this.a &&
        state == "move"
        ){
            // console.log(marked.length)
            // console.log(this)
            // console.log(this.isOccupied(players[cP].color))
            if (marked.length == 0 && this.isOccupied(players[cP].color) != false){
                marked.push(this);
            } else {
                marked.push(this);
            }
            // console.log(marked)
        }
    };

    // returns an array of all pawns on the tile if pawnColor is undefined
    // returns an array of all the specified colored pawns if pawnColor is defined
    // returns false if the arrays are empty
    isOccupied(pawnColor){
        if (this.pawns.length > 0){
            if (pawnColor === undefined){
                return this.pawns;
            } else {
                let temp = [];
                for (let i in this.pawns){
                    if (this.pawns[i].color == pawnColor){
                        temp.push(this.pawns[i]);
                    }
                }

                if (temp.length > 0){
                    return temp
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
};

class Dice{
    constructor(x,y,a,face,ratio){
        this.x = x;
        this.y = y;
        this.a = a;
        this.face = face;
        this.ratio = ratio;
        this.throws = []; // Current roll history
    }

    // Rolls the dice
    roll(number){ 
        number = number || Math.floor(Math.random()*6+1); //The optional parameter is for debug purposes only
        // console.log(num);
        this.face = number;
        this.throws.push(number);
    };
 
    // Rolls the dice if the dice was clicked
    clicked(x,y){
        // console.log(this.x*this.a + " : " + (this.x + this.ratio)*this.a + " : " + this.y*this.a + " : " + (this.y + this.ratio)*this.a)
        if (x > this.x*this.a/this.ratio && x < (this.x + this.ratio)*this.a/this.ratio && 
            y > this.y*this.a/this.ratio && y < (this.y + this.ratio)*this.a/this.ratio){

            // console.log(this.x*this.a + " : " + (this.x + 2)*this.a + " : " + this.y*this.a + " : " + (this.y + 2)*this.a)
            // console.log(this)
            this.roll()
        }
    }
};

class Player{
    constructor(name,color,ai){
        this.name = name;
        this.color = color;
        this.ai = ai;
    }
};

class Pawn{
    constructor(color, moved){
        this.color = color;
        this.x = "";
        this.y = "";
        this.r = "";
        this.moved = moved || false;
    }

    // Not used
    clicked(x,y){
        if (dist(x, y, this.x, this.y) < this.r){

            // console.log(this)
        }
    };    
}

// This is the data model for a board. Contains relatvie positions for scalability. And markers for special tiles and ordering. This would have been retrieved from the boards.json however to get that done it would have included such jobs that I think would have been overkill for this class
const boards = {
    "classic" : {
        "tiles" : [
            {"x": 8, "y": 13, "home": false, "finish": false, "start": "red", "number": 1},
            {"x": 8, "y": 12, "home": false, "finish": false, "start": false, "number": 2},
            {"x": 8, "y": 11, "home": false, "finish": false, "start": false, "number": 3},
            {"x": 8, "y": 10, "home": false, "finish": false, "start": false, "number": 4},
            {"x": 8, "y": 9, "home": false, "finish": false, "start": false, "number": 5},
            {"x": 9, "y": 9, "home": false, "finish": false, "start": false, "number": 6},
            {"x": 9, "y": 8, "home": false, "finish": false, "start": false, "number": 7},
            {"x": 10, "y": 8, "home": false, "finish": false, "start": false, "number": 8},
            {"x": 11, "y": 8, "home": false, "finish": false, "start": false, "number": 9},
            {"x": 12, "y": 8, "home": false, "finish": false, "start": false, "number": 10},
            {"x": 13, "y": 8, "home": false, "finish": false, "start": false, "number": 11},
            {"x": 13, "y": 7, "home": false, "finish": false, "start": false, "number": 12},
            {"x": 13, "y": 6, "home": false, "finish": false, "start": "blue", "number": 13},
            {"x": 12, "y": 6, "home": false, "finish": false, "start": false, "number": 14},
            {"x": 11, "y": 6, "home": false, "finish": false, "start": false, "number": 15},
            {"x": 10, "y": 6, "home": false, "finish": false, "start": false, "number": 16},
            {"x": 9, "y": 6, "home": false, "finish": false, "start": false, "number": 17},
            {"x": 9, "y": 5, "home": false, "finish": false, "start": false, "number": 18},
            {"x": 8, "y": 5, "home": false, "finish": false, "start": false, "number": 19},
            {"x": 8, "y": 4, "home": false, "finish": false, "start": false, "number": 20},
            {"x": 8, "y": 3, "home": false, "finish": false, "start": false, "number": 21},
            {"x": 8, "y": 2, "home": false, "finish": false, "start": false, "number": 22},
            {"x": 8, "y": 1, "home": false, "finish": false, "start": false, "number": 23},
            {"x": 7, "y": 1, "home": false, "finish": false, "start": false, "number": 24},
            {"x": 6, "y": 1, "home": false, "finish": false, "start": "yellow", "number": 25},
            {"x": 6, "y": 2, "home": false, "finish": false, "start": false, "number": 26},
            {"x": 6, "y": 3, "home": false, "finish": false, "start": false, "number": 27},
            {"x": 6, "y": 4, "home": false, "finish": false, "start": false, "number": 28},
            {"x": 6, "y": 5, "home": false, "finish": false, "start": false, "number": 29},
            {"x": 5, "y": 5, "home": false, "finish": false, "start": false, "number": 30},
            {"x": 5, "y": 6, "home": false, "finish": false, "start": false, "number": 31},
            {"x": 4, "y": 6, "home": false, "finish": false, "start": false, "number": 32},
            {"x": 3, "y": 6, "home": false, "finish": false, "start": false, "number": 33},
            {"x": 2, "y": 6, "home": false, "finish": false, "start": false, "number": 34},
            {"x": 1, "y": 6, "home": false, "finish": false, "start": false, "number": 35},
            {"x": 1, "y": 7, "home": false, "finish": false, "start": false, "number": 36},
            {"x": 1, "y": 8, "home": false, "finish": false, "start": "green", "number": 37},
            {"x": 2, "y": 8, "home": false, "finish": false, "start": false, "number": 38},
            {"x": 3, "y": 8, "home": false, "finish": false, "start": false, "number": 39},
            {"x": 4, "y": 8, "home": false, "finish": false, "start": false, "number": 40},
            {"x": 5, "y": 8, "home": false, "finish": false, "start": false, "number": 41},
            {"x": 5, "y": 9, "home": false, "finish": false, "start": false, "number": 42},
            {"x": 6, "y": 9, "home": false, "finish": false, "start": false, "number": 43},
            {"x": 6, "y": 10, "home": false, "finish": false, "start": false, "number": 44},
            {"x": 6, "y": 11, "home": false, "finish": false, "start": false, "number": 45},
            {"x": 6, "y": 12, "home": false, "finish": false, "start": false, "number": 46},
            {"x": 6, "y": 13, "home": false, "finish": false, "start": false, "number": 47},
            {"x": 7, "y": 13, "home": false, "finish": false, "start": false, "number": 48},
            {"x": 7, "y": 12, "home": false, "finish": "red", "start": false, "number": 1},
            {"x": 7, "y": 11, "home": false, "finish": "red", "start": false, "number": 2},
            {"x": 7, "y": 10, "home": false, "finish": "red", "start": false, "number": 3},
            {"x": 7, "y": 9, "home": false, "finish": "red", "start": false, "number": 4},
            {"x": 12, "y": 7, "home": false, "finish": "blue", "start": false, "number": 13},
            {"x": 11, "y": 7, "home": false, "finish": "blue", "start": false, "number": 14},
            {"x": 10, "y": 7, "home": false, "finish": "blue", "start": false, "number": 15},
            {"x": 9, "y": 7, "home": false, "finish": "blue", "start": false, "number": 16},
            {"x": 7, "y": 2, "home": false, "finish": "yellow", "start": false, "number": 25},
            {"x": 7, "y": 3, "home": false, "finish": "yellow", "start": false, "number": 26},
            {"x": 7, "y": 4, "home": false, "finish": "yellow", "start": false, "number": 27},
            {"x": 7, "y": 5, "home": false, "finish": "yellow", "start": false, "number": 28},
            {"x": 2, "y": 7, "home": false, "finish": "green", "start": false, "number": 37},
            {"x": 3, "y": 7, "home": false, "finish": "green", "start": false, "number": 38},
            {"x": 4, "y": 7, "home": false, "finish": "green", "start": false, "number": 39},
            {"x": 5, "y": 7, "home": false, "finish": "green", "start": false, "number": 40},
            {"x": 8, "y": 14, "home": "red", "finish": false, "start": false, "number": 0},
            {"x": 14, "y": 6, "home": "blue", "finish": false, "start": false, "number": 0},
            {"x": 6, "y": 0, "home": "yellow", "finish": false, "start": false, "number": 0},
            {"x": 0, "y": 8, "home": "green", "finish": false, "start": false, "number": 0}
        ],
        "dice" : {
            "x": 11,
            "y": 2,
            "ratio": 2
        },
        "names" : {
            "red": {"x": 9,"y": 14},
            "blue": {"x": 10,"y": 10},
            "yellow": {"x": 9,"y": 1},
            "green": {"x": 1,"y": 10}
        },
        "currentPlayer" : {"x": 0, "y": 1},
        "buttons": {
            "knockOut": {"x": 0, "y": 3, "a": 1, "b": 2},
            "endTurn": {"x": 0, "y": 5, "a": 1, "b": 2}
        }
    }
};

// Retrieving the game settings
var gameSettings = JSON.parse(localStorage.getItem("gameSettings"));
// Removing the settings stored so it the code is not creating trash on one's computer
localStorage.removeItem("gameSettings");

var board = gameSettings.board;
var dice;
var state = "throw"; // Drives the game
var unitSize;
var players = [];
var cP; // Current player
var cPPawns = []; // Contains all the tiles that has a pawn of the current player on it
var validMoves = [];
var tiles = [];
var startTiles = {"red": {}, "blue": {}, "yellow": {}, "green": {}};
var homeTiles = {"red": {}, "blue": {}, "yellow": {}, "green": {}};
var finishTiles = {"red": [], "blue": [], "yellow": [], "green": []};
var marked = [];

function setup(){
    unitSize = windowHeight / 15;
    setPlayers();
    createTiles(board);
    createDice(board);
    // console.log(players)

    var canvas = createCanvas(windowHeight, windowHeight); 
    canvas.parent("canvas");
};

function draw(){
    background(220, 220, 220);
    drawBoard(dice, players, board);
    if (!gameOver()){
        turn();
        toggleKO();
    } else {
        textSize(unitSize * 2);
        fill(255, 0, 0);
        text("Game Over", windowHeight / 10, windowHeight / 2);
    }
}

// Setup
// Creates the board with absolute coordinates
function createTiles(chosenBoard){
    let board = boards[chosenBoard].tiles;
    for (let i in board){
        let tile = new Tile(board[i].x, board[i].y, unitSize, board[i].home, board[i].finish, board[i].start, board[i].number);
        tiles.push(tile);
        if (board[i].home != false){
            homeTiles[board[i].home] = tile;
        }
        if (board[i].start != false){
            startTiles[board[i].start] = tile;
        }
        if (board[i].finish != false){
            finishTiles[board[i].finish].push(tile);
        }
    }
};

// Setup
// Creates the dice with absolute coordinates
function createDice(chosenBoard){
    dice = boards[chosenBoard].dice
    dice = new Dice(dice.x,dice.y,unitSize*dice.ratio,1,dice.ratio);
    // console.log(dice)
};

// Draw
// Conatins everything that needs to be drawn
function drawBoard(dice, players, board){
    drawTiles();
    drawDice(dice);
    drawNames(players,board);
    drawPawns();
}

// Draw
// Draws the board
function drawTiles(){
    stroke(10);
    strokeWeight(1);
    for (let i in tiles){
        let tile = tiles[i];

        // Changes fill color according to the current tile
        switch (tile.color){
            case "red":
                fill(255, 100, 100);
            break;
            case "blue":
                fill(100, 100, 255);
            break;
            case "yellow":
                fill(255, 255, 100);
            break;
            case "green":
                fill(100, 255, 100);
            break;
            case "white":
                fill(255,255,255);
            break;
        }
        square(tile.x*unitSize, tile.y*unitSize, unitSize);
        
        // If there is a marked tile it gets highlighted
        if (marked.length == 1){
            fill(50, 50, 50);
            square(marked[0].x*unitSize, marked[0].y*unitSize, unitSize);
            fill(229, 204, 255);
            // console.log(marked[0])
            for (let j in marked[0].validMoves){
                // console.log(marked[0].validMoves)
                let valid = marked[0].validMoves[j];
                square(valid.x*unitSize, valid.y*unitSize, unitSize);
            }
        }
    }

    // fill(229, 204, 255);

    // for (let i in tiles){
    //     let tile = tiles[i];
    //     if (tile.validMoves.length > 0){
    //         for (let j in tile.validMoves){
    //             let valid = tile.validMoves[j];
    //             square(valid.x*unitSize, valid.y*unitSize, unitSize);
    //         }
    //     }
    // }

};

// Draw
// Draws the dice
function drawDice(dice){
    fill(255, 255, 255);
    // console.log(dice)
    let x = dice.x*(dice.a/dice.ratio);
    let y = dice.y*(dice.a/dice.ratio);
    // console.log(dice)
    switch (dice.face){
        case 1:
            square(x, y, dice.a, 10);
            fill(0, 0, 0);
            circle(x + dice.a/2, y + dice.a/2, dice.a/5);
        break;
        case 2:
            square(x, y, dice.a, 10);
            fill(0, 0, 0);
            circle(x + (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
        break;
        case 3:
            square(x, y, dice.a, 10);
            fill(0, 0, 0);
            circle(x + dice.a/2, y + dice.a/2, dice.a/5);
            circle(x + (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
        break;
        case 4:
            square(x, y, dice.a, 10);
            fill(0, 0, 0);
            circle(x + (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
            circle(x + (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
        break;
        case 5:
            square(x, y, dice.a, 10);
            fill(0, 0, 0);
            circle(x + dice.a/2, y + dice.a/2, dice.a/5);
            circle(x + (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
            circle(x + (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
        break;
        case 6:
            square(x, y, dice.a, 10);
            fill(0, 0, 0);
            circle(x + (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
            circle(x + (dice.a/10) * 2, y + dice.a - (dice.a/10) * 2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + (dice.a/10) * 2, dice.a/5);
            circle(x + (dice.a/10) * 2, y + dice.a/2, dice.a/5);
            circle(x + dice.a - (dice.a/10) * 2, y + dice.a/2, dice.a/5);
        break;
    };
    
    textSize(unitSize / 2);
    fill(0, 0, 0);
    textFont("Helvetica");
    text("Throws: " + dice.throws.join(), x - dice.a / 2, y + dice.a + unitSize);
};

// Draw
// Draws the names
function drawNames(players, board){
    let coords = boards[board].names;
    textSize(unitSize / 2);
    fill(0, 0, 0);
    textFont("Helvetica");
    for (let i in players){
        if (players[i].ai != "off"){
            text(players[i].name, coords[players[i].color].x * unitSize, coords[players[i].color].y * unitSize);
        }
    }
    text(players[cP].name + "'s turn", boards[board].currentPlayer.x * unitSize + unitSize / 2, boards[board].currentPlayer.y * unitSize)
};

// Draws the pawns
function drawPawns(){
    for (let i in tiles){
        let tile = tiles[i];
        let x = tile.x;
        let y = tile.y;
        let a = tile.a;
        let pawns = tile.isOccupied();

        if(pawns != false){
            for (let j in pawns){
                switch (pawns[j].color){
                    case "red":
                        fill(255, 0, 0);
                    break;
                    case "blue":
                        fill(0, 0, 255);
                    break;
                    case "yellow":
                        fill(255, 255, 0);
                    break;
                    case "green":
                        fill(0, 255, 0);
                    break;
                    case "white":
                        fill(255,255,255);
                    break;
                }
                if (pawns.length == 1){
                    pawns[j].x = x * a + a / 2;
                    pawns[j].y = y * a + a / 2;
                    pawns[j].r = a / 2;
                    circle(x * a + a / 2, y * a + a / 2, a / 2);
                } else {
                    switch (j){
                        case "0":
                            pawns[j].x = x * a + a / 4;
                            pawns[j].y = y * a + a / 4;
                            pawns[j].r = a / 4;
                            circle(x * a + a / 4, y * a + a / 4, a / 4);
                        break;
                        case "1":
                            pawns[j].x = (x + 1) * a + 1 - a / 4;
                            pawns[j].y = y * a + a / 4;
                            pawns[j].r = a / 4;
                            circle((x + 1) * a + 1 - a / 4, y * a + a / 4, a / 4);
                        break;
                        case "2":
                            pawns[j].x = x * a + a / 4;
                            pawns[j].y = (y + 1) * a - a / 4;
                            pawns[j].r = a / 4;
                            circle(x * a + a / 4, (y + 1) * a - a / 4, a / 4);
                        break;
                        case "3":
                            pawns[j].x = (x + 1) * a + 1 - a / 4;
                            pawns[j].y = (y + 1) * a - a / 4;
                            pawns[j].r = a / 4;
                            circle((x + 1) * a + 1 - a / 4, (y + 1) * a - a / 4, a / 4);
                        break;
                    }
                }
            }
        }
    }
}

// Used to end the current player's turn.
function endTurn(){
    for(let i in tiles){
        if (tiles[i].isOccupied() != false){
            for (let j in tiles[i].pawns){
                tiles[i].pawns[j].moved = false;
            }
        }
    }
    if (cP == players.length - 1){
        cP = 0;
    } else {
        cP++;
    }
    dice.throws = [];
    marked = [];
    state = "throw";
}

//Checks if everyone has finished the game except one player.
function gameOver(){
    let finished = {};
    for (let i in players){
        finished[players[i].color] = true;
    }
    for (let i in finishTiles){
        if (finished.hasOwnProperty(finishTiles[i][0].color)){
            for (let j in finishTiles[i]){
                if (finishTiles[i][j].isOccupied() == false){
                    finished[i] = false;
                }
            }
        }
    }
    // console.log(finished)
    let count = 0;
    for (let i in finished){
        if (finished[i] == false){
            count++;
        }
    }

    if (count == 1){
        return true;
    } else {
        return false;
    }
}

// Makes the KO button visible if the current player can knock someone out
function toggleKO(){
    let b = document.getElementById("ko");
    if (marked.length > 0 && marked[0].pawns.length > 1){
        let temp = [];
        for (let i in marked[0].pawns){
            if (!temp.includes(marked[0].pawns[i].color)){
                temp.push(marked[0].pawns[i].color);
            }
        }

        if (temp.length > 1 && (marked[0].type != "start" || (marked[0].type == "start" && marked[0].color == players[cP].color))){
            b.style.display = "inline";
        }
    } else {
        b.style.display = "none";
    }
}

//If the button was pushed knocks the others out (they get sent to their homes) and ends your turn 
function knockOut(){
    // console.log("called")
    for (let i in tiles){
        let tile = tiles[i];
        if (tile == marked[0]){
            // console.log(tile.pawns)
            for (let j in tile.pawns){
                let pawn = tile.pawns[j]
                if (pawn.color != players[cP].color){
                    homeTiles[pawn.color].pawns.push(new Pawn(pawn.color));
                    tile.pawns.splice(j,1);
                }
            }
            for (let j in tile.pawns){// Not nice solutions but 
                let pawn = tile.pawns[j]
                if (pawn.color != players[cP].color){
                    homeTiles[pawn.color].pawns.push(new Pawn(pawn.color));
                    tile.pawns.splice(j,1);
                }
            }
        }
    }
    endTurn();
}

// Registers mousclicks
function mousePressed(){
    if (state == "throw"){
        dice.clicked(mouseX,mouseY);
    }

    for (let i in tiles){
        tiles[i].clicked(mouseX,mouseY);
    }
    // console.log(marked)
}

function setPlayers(){
    let player = gameSettings.players;
    for (let i in player){
        if (player[i].ai != "off"){
            players.push(new Player(player[i].name, player[i].color, player[i].ai))
        }
    }
    cP = Math.floor(Math.random() * players.length);
}

// Checks the valid moves so they can be highlighted and determined if the player inputted a valid move
function considerValidMoves(){
    cPPawns = [];
    for (let i in tiles){
        let tile = tiles[i]
        if(tile.isOccupied(players[cP].color)){
            cPPawns.push(tile);
        }
        tile.validMoves = [];
        if (cPPawns.includes(tile)){ //If the tile is occupied
            // If the mark was a home tile a 6 was rolled and the start tile is empty
            if (tile.type == "home" && dice.throws[0] == 6 && !startTiles[players[cP].color].isOccupied(players[cP].color)){
                tile.validMoves.push(startTiles[players[cP].color]);

            } else if (tile.type == "start" || tile.type == "board"){ // If the marked tile is start or a non special tile
                if (tile.number + dice.throws[0] < 48){ // When not crossing 48 -> 1
                    for (let j in tiles){ // Possible move
                        if (tiles[j].number == tile.number + dice.throws[0]){ // The number is correct
                            // console.log(Object.keys(tiles[j].isOccupied()).length);
                            // If its a board tile or a finish tile of own color and not occupied
                            if (((tiles[j].type == "board" || tiles[j].type == "start") || 
                            (tiles[j].type == "finish" && tiles[j].color == players[cP].color && !tiles[j].isOccupied(players[cP].color) &&
                                ((players[cP].color == "red" && tile.number > 40) ||
                                (players[cP].color == "blue" && tile.number < 13) ||
                                (players[cP].color == "yellow" && tile.number < 25) ||
                                (players[cP].color == "green" && tile.number < 37) ))) && Object.keys(tiles[j].isOccupied()).length < 4){
                                    // console.log(players[cP].color)
                                    // console.log(tile.number)
                                    // console.log(tiles[j])
                                tile.validMoves.push(tiles[j]);
                            }
                        }
                    }
                } else { // When crossing 48 -> 1
                    for (let j in tiles){
                        if (tiles[j].number == tile.number + dice.throws[0] - 48){// The number is correct
                            if (((tiles[j].type == "board" || tiles[j].type == "start") || 
                            tiles[j].type == "finish" && tiles[j].color == players[cP].color && !tiles[j].isOccupied(players[cP].color) &&
                                ((players[cP].color == "red" && tile.number > 40) ||
                                (players[cP].color == "blue" && tile.number < 13) ||
                                (players[cP].color == "yellow" && tile.number < 25) ||
                                (players[cP].color == "green" && tile.number < 37))) && Object.keys(tiles[j].isOccupied()).length < 4){// If it's a finish block it is not occupied already
                                tile.validMoves.push(tiles[j]);
                            }
                        }
                    }
                }
            } else if (tile.type == "finish"){ //The marked tile is a finish block
                for (let j in tiles){
                    if (tiles[j].type == "finish" && tiles[j].number == tile.number + dice.throws[0]){
                        tile.validMoves.push(tiles[j]);
                    }
                }
            }    
        } 
    }
}

// Controls the game
function turn(){
    switch (state){
        case "throw":
            if (dice.throws.length != 0 && (dice.face != 6 || dice.throws.length == 6)){
                marked = [];
                for (let i in tiles){
                    if(tiles[i].isOccupied(players[cP].color)){
                        cPPawns.push(tiles[i]);
                    }
                }
                considerValidMoves();
                state = "move";
            }
        break;
        case "move":
            if (marked.length == 2 && marked[0].validMoves.includes(marked[1])){
                for (let i in tiles){
                    let tile = tiles[i];
                    if (tile == marked[0]){
                        let j = 0
                        let removed = false;
                        while (!removed){
                            if (tiles[i].pawns[j].color == players[cP].color){
                                tiles[i].pawns.splice(j, 1);
                                removed = true;
                            }
                            j++;
                        }
                    } else if (tile == marked[1]){
                        tiles[i].pawns.push(new Pawn(players[cP].color, true));
                    }
                }

                marked = [];
                
                dice.throws.splice(0,1);
                considerValidMoves();


            } else if (marked.length == 2){
                marked[0] = marked[1];
                marked.splice(1,1);
            }

            //     for (let i in validMoves){
            //         if (validMoves[i].type == "finish" && validMoves[i].color != players[cP].color){
            //             validMoves.splice(i, 1);
            //         }
            //     }
            // } else if (marked.length == 2 && validMoves.includes(marked[1])){
            //     for (let i in tiles){
            //         switch (tiles[i]){
            //             case marked[0]:
            //                 let j = 0
            //                 let removed = false;
            //                 while (!removed){
            //                     if (tiles[i].pawns[j].color == players[cP].color){
            //                         tiles[i].pawns.splice(j, 1);
            //                         removed = true;
            //                     }
            //                     j++;
            //                 }
            //             break;
            //             case marked[1]:
            //                 tiles[i].pawns.push(new Pawn(players[cP].color));
            //             break;
            //         }
            //     }
            //     dice.throws.splice(0,1);
            // } 
            // else if (validMoves.length == 0 && dice.throws.length > 0 && marked.length > 1){
            //     if (cP == 3){
            //         cP = 0;
            //     } else {
            //         cP++;
            //     }
            //     dice.throws = [];
            //     state = "throw";
            // } else {
            //     marked = [];
            // }
            // if (dice.throws.length == 0){
            //     if (cP == 3){
            //         cP = 0;
            //     } else {
            //         cP++;
            //     }
            //     state = "throw";
            // }
        break;
    }
}