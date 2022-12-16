var board = [
//  0    1    2    3    4    5    6    7
  ['-', '-', '-', '-', '-', '-', '-', '-'], //0
  ['-', '-', '-', '-', '-', '-', '-', '-'], //1
  ['-', '-', '-', '-', '-', '-', '-', '-'], //2
  ['-', '-', '-', '-', '-', '-', '-', '-'], //3
  ['-', '-', '-', '-', '-', '-', '-', '-'], //4
  ['-', '-', '-', '-', '-', '-', '-', '-'], //5
  ['-', '-', '-', '-', '-', '-', '-', '-'], //6
  ['-', '-', '-', '-', '-', '-', '-', '-']  //7
]

let pieceChosen = false;
let selectedPiece;
let tilesize;
let pawnFirstMove = true
let hasib;

//variables
let kingImgs = []
let queenImgs = []
let rookImgs = []
let bishopImgs = []
let knightImgs = []
let pawnImgs = []

let king, queen, rook, bishop, knight, pawn;

var outerIndex, innerIndex, x, y;

function setup() {
  createCanvas(800, 800);
  tilesize = width / 8;
  startPos()
  console.log(board)
}

function draw() {
  drawBoard()
  pieceRules()
  display()
  pieceInteractions()
}

function mousePressed() {
  outerIndex = (int)(mouseY / tilesize) //Describes outer index in 2D array board on the actual board
  innerIndex = (int)(mouseX / tilesize) //Describes inner index in 2D array board on the actual board

  x = innerIndex * tilesize //x-coordinate for pieces
  y = outerIndex * tilesize //y-coordinate for pieces

  
  if (0 < mouseX && mouseX < 800 && 0 < mouseY && mouseY < 800) {//runs if the cursor is on the board
    if (!pieceChosen && board[outerIndex][innerIndex] != '-') { //checks if a piece has been selected
      selectedPiece = board[outerIndex][innerIndex] //variable selectedPiece becomes the piece placed on the pieceChosened tile
      pieceChosen = true //a piece has been selected  
      
    }
    if (pieceChosen && board[outerIndex][innerIndex] == 'K' || board[outerIndex][innerIndex] == 'Q' || board[outerIndex][innerIndex] == 'R' || board[outerIndex][innerIndex] == 'B' || board[outerIndex][innerIndex] == 'N' || board[outerIndex][innerIndex] == 'P') { //runs if a piece has been selected
      movepiece(selectedPiece) //calls function and moves selected piece
      pieceChosen = false; //select new piece
      if (selectedPiece == pawn) {
        pawnFirstMove = false
      }
      selectedPiece = 0
    }
    resetRules()
  }
}

//function for moving pieces
function movepiece(piece) {
  piece.x = x //moves selected piece to x-value for selected tile
  piece.y = y //moves selected piece to y-value for selected tile
  board[outerIndex][innerIndex] = piece //a piece is placed in board array equal to the selected tile
}

//function for resets applied rule
function resetRules() {
  //nested loop for resetting rules of pieces
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      if (board[i][j] != king && board[i][j] != queen && board[i][j] != rook && board[i][j] != bishop && board[i][j] != knight && board[i][j] != pawn) { //checks the board for other elements than valid pieces
        board[i][j] = '-' //everything in the board array that isn't a valid piece will become empty '-'
      }
    }
  }
}

//function for applying rules
function pieceRules() {
  fill(105, 105, 105, 105)
  strokeWeight(5)
  if (pieceChosen) {
    if (selectedPiece == king) { //checks if the selected piece is a king
      king.rule() //applies rules for king
    }
    if (selectedPiece == queen) {
      queen.thisMove('Q')
      queen.rule(1)
      queen.rule(-1)
      queen.rule1(1, 1)
      queen.rule1(1, -1)
      queen.rule1(-1, 1)
      queen.rule1(-1, -1)
    }
    if (selectedPiece == rook) { //checks if the selected piece is a king
      rook.thisMove('R')
      rook.rule(1) //applies rules for rook, move in negative directions
      rook.rule(-1) //applies rules for rook, move in positive directions
    }
    if (selectedPiece == pawn) { //checks if the selected piece is a king
      if (!pawnFirstMove) { //checks if it is the first move of pawn
        pawn.rule(2) //applies rules for pawn, 1 move forward

      } else { //code that runs if it is the first move of pawn
        pawn.rule(3) //applies rules for pawn, 2 moves forward
      }
    }
    if (selectedPiece == knight) {
      knight.thisMove('N')
      knight.rule(1, -2)
      knight.rule(-1, -2)
      knight.rule(1, 2)
      knight.rule(-1, 2)

      knight.rule(2, 1)
      knight.rule(-2, 1)
      knight.rule(2, -1)
      knight.rule(-2, -1)
    }
    if (selectedPiece == bishop) {
      bishop.thisMove('B')
      bishop.rule(1, 1)
      bishop.rule(1, -1)
      bishop.rule(-1, 1)
      bishop.rule(-1, -1)
    }
  }
}

//VISUAL FUNCTIONS
//draws board
function drawBoard() {
  background('#CF8948'); //makes the background brown
  stroke('#29140B'); //makes the stroke dark brown
  fill('#FFCC9C'); //fills rectangles with beige color

  // neted loop for drawing tiles on the board
  for (let x = 0; x < width; x += tilesize * 2) { //loop that runs if x is less than width
    for (let y = 0; y < height; y += tilesize * 2) {//loop that runs if y is less than height
      strokeWeight(1) //the rectangles stroke weight
      rect(x, y, tilesize, tilesize) //draws rectangles starting from top left corner
      rect(x + tilesize, y + tilesize, tilesize, tilesize) //draws rectangles starting staggered with 1 tile on x and y axis
    }
  }
  strokeWeight(12.5) //strokewight for board outline
  noFill() //applies no fill for the board rectangle
  rect(0, 0, 800, 800) //draw rectangle for the entire board
}

//displaying pieces on board
function display() {
  king.display()
  queen.display()
  rook.display()
  bishop.display()
  knight.display()
  pawn.display()
}

//effect for hovering over pieces
function pieceInteractions() {
  king.pieceInteraction()
  queen.pieceInteraction()
  rook.pieceInteraction()
  bishop.pieceInteraction()
  knight.pieceInteraction()
  pawn.pieceInteraction()
}

function preload() {
  kingImgs.push(loadImage('pieces/white/king.png'))
  kingImgs.push(loadImage('pieces/hover/king.png'))
  kingImgs.push(loadImage('pieces/chosen/king.png'))

  queenImgs.push(loadImage('pieces/white/queen.png'))
  queenImgs.push(loadImage('pieces/hover/queen.png'))
  queenImgs.push(loadImage('pieces/chosen/queen.png'))

  rookImgs.push(loadImage('pieces/white/rook.png'))
  rookImgs.push(loadImage('pieces/hover/rook.png'))
  rookImgs.push(loadImage('pieces/chosen/rook.png'))

  bishopImgs.push(loadImage('pieces/white/bishop.png'))
  bishopImgs.push(loadImage('pieces/hover/bishop.png'))
  bishopImgs.push(loadImage('pieces/chosen/bishop.png'))

  knightImgs.push(loadImage('pieces/white/knight.png'))
  knightImgs.push(loadImage('pieces/hover/knight.png'))
  knightImgs.push(loadImage('pieces/chosen/knight.png'))

  pawnImgs.push(loadImage('pieces/white/pawn.png'))
  pawnImgs.push(loadImage('pieces/hover/pawn.png'))
  pawnImgs.push(loadImage('pieces/chosen/pawn.png'))
}


//initalizing pieces
function startPos() {
  king = new King(tilesize, tilesize * 7)
  queen = new Queen(tilesize * 2, tilesize * 7)
  rook = new Rook(tilesize * 3, tilesize * 7)
  bishop = new Bishop(tilesize * 4, tilesize * 7)
  knight = new Knight(tilesize * 5, tilesize * 7)
  pawn = new Pawn(tilesize * 6, tilesize * 7)

  board[7][1] = king
  board[7][2] = queen
  board[7][3] = rook
  board[7][4] = bishop
  board[7][5] = knight
  board[7][6] = pawn
}