class Piece {
    constructor(imgs, x, y) {
        this.imgs = imgs;
        this.x = x;
        this.y = y;
        this.size = tilesize;
        this.imgIndex = 0;
    }

    //method for displaying pieces
    display() {
        image(this.imgs[this.imgIndex], this.x, this.y, this.size, this.size) //an image with values according to an object from Piece class

    }

    //method for making current piece location available
    thisMove(pieceLetter) { //has argument pieceLetter
        rect(this.x, this.y, tilesize, tilesize) //draws rectangle from the selected piece
        board[this.y / tilesize][this.x / tilesize] = pieceLetter //changes the array element index of the selected piece location to the pieceLetter 
    }

    //method for interaction with pieces
    pieceInteraction() {
        if (!pieceChosen && mouseX >= this.x && mouseX <= this.x + tilesize && mouseY >= this.y && mouseY < this.y + tilesize) { //checks if cursor is over a piece
            this.imgIndex = 1 //variable for image index changes to 1 (hover img)

        } else if (selectedPiece == this) { //checks if selected piece is a certain piece
            this.imgIndex = 2 //variable for image index changes to 2 (chosen img)

        } else { //if none of above if statements is true
            this.imgIndex = 0 //variable for image index changes to 0 (static img)
        }
    }
}


class King extends Piece {
    constructor(x, y) {
        super(kingImgs, x, y) //creates a king piece from the mother class
    }

    //rule method for King class
    rule() {
        //nested loop for where the king can be placed

        for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
                let xPos = this.x + tilesize * i //variable for x position
                let yPos = this.y + tilesize * j //variable for y position

                let innerIndex = xPos / tilesize //variable for inner index
                let outerIndex = yPos / tilesize //variable for outer index


                if (innerIndex >= 0 && outerIndex >= 0 && innerIndex < board.length && outerIndex < board.length) { //checks if a possible tile/index of the board array where the king can go, is on the board
                    if (board[outerIndex][innerIndex] == '-' || board[outerIndex][innerIndex] == this || board[outerIndex][innerIndex] == 'K') { //checks if array elements in the board array are empty or if it is a king
                        rect(xPos, yPos, tilesize, tilesize) //draw rectangles for where the king can be placed
                        board[outerIndex][innerIndex] = 'K' //replaces empty space or king with a 'K'
                    }
                }
            }
        }
    }
}

class Queen extends Piece {
    constructor(x, y) {
        super(queenImgs, x, y)
    }
    rule(direction) {
        for (let i = 1; i < board.length; i++) { //loop for where the queen can be placed in rows on the right side of the queen
            let xPos = this.x + tilesize * i * direction //varaiable for x position changing with i

            let innerIndexHorizontal = xPos / tilesize //variable for inner index
            let outerIndexHorizontal = this.y / tilesize //variable for outer index

            if (innerIndexHorizontal >= 0 && outerIndexHorizontal >= 0 && innerIndexHorizontal < board.length && outerIndexHorizontal < board.length) { //checks if inner and outer index has a valid board value
                if (board[outerIndexHorizontal][innerIndexHorizontal] != '-' && board[outerIndexHorizontal][innerIndexHorizontal] != this && board[outerIndexHorizontal][innerIndexHorizontal] != 'Q') { //checks if the array elements in board, is a piece that is not a queen
                    break //if there is a piece (not queen) then the program breaks out of the loop
                }
                rect(xPos, this.y, tilesize, tilesize) //draw rectangles for where the queen can be placed (right side)
                if (board[outerIndexHorizontal][innerIndexHorizontal] == '-' || board[outerIndexHorizontal][innerIndexHorizontal] == this) { //checks if the array elements in board equal to the tiles, horizontal from queen, is empty 
                    board[outerIndexHorizontal][innerIndexHorizontal] = 'Q' //replaces empty space with a 'Q'
                }
            }
        }

        for (let i = 1; i < board.length; i++) { //loop for where the queen can be placed in columns under the queen
            let yPos = this.y + tilesize * i * direction  //varaiable for y position changing with i

            let innerIndexVertical = this.x / tilesize //variable for inner index
            let outerIndexVertical = yPos / tilesize //variable for outer index


            if (innerIndexVertical >= 0 && outerIndexVertical >= 0 && innerIndexVertical < board.length && outerIndexVertical < board.length) {  //checks if inner and outer index has a valid board value
                if (board[outerIndexVertical][innerIndexVertical] != '-' && board[outerIndexVertical][innerIndexVertical] != this && board[outerIndexVertical][innerIndexVertical] != 'Q') { //checks if the array elements in board is a a piece, that is not a queen
                    break //if there is a piece (not queen) then the program breaks out of the loop
                }
                rect(this.x, yPos, tilesize, tilesize) //draw rectangles for where the queen can be placed
                if (board[outerIndexVertical][innerIndexVertical] == '-' || board[outerIndexVertical][innerIndexVertical] == this) { //checks if the array elements in board equal to the tiles, vertical from queen, is empty 
                    board[outerIndexVertical][innerIndexVertical] = 'Q' //replaces empty space with a 'Q'
                }
            }
        }
    }

    rule1(directionX, directionY) {
        for (let i = 1; i < board.length; i++) {
            let xPos = this.x + tilesize * i * directionX //variable for x position, changing with i
            let yPos = this.y + tilesize * i * directionY //variable for y position, changing with i

            let innerIndex = xPos / tilesize //variable for inner index
            let outerIndex = yPos / tilesize //variable for outer index

            if (innerIndex >= 0 && outerIndex >= 0 && innerIndex < board.length && outerIndex < board.length) {  //checks if inner and outer index has a valid board value
                if (board[outerIndex][innerIndex] != '-' && board[outerIndex][innerIndex] != this && board[outerIndex][innerIndex] != 'Q') { //checks if the array elements diagonal from the queen is a piece that is not a bishop
                    break //if there is a piece (not queen) then the program breaks out of the loop
                }
                rect(xPos, yPos, tilesize, tilesize) //draw rectangles for where the bishop can be placed
                if (board[outerIndex][innerIndex] == '-' || board[outerIndex][innerIndex] == this) { //checks if the array elements in board diagonal from queen is empty or a bishop
                    board[outerIndex][innerIndex] = 'Q' //replaces empty space with a 'Q'
                }
            }
        }
    }
}


class Rook extends Piece {
    constructor(x, y) {
        super(rookImgs, x, y)
    }
    //rule method for rook class with direction argument
    rule(direction) {
        for (let i = 1; i < board.length; i++) { //loop for where the rook can be placed in rows on the right side of the rook
            let xPos = this.x + tilesize * i * direction //varaiable for x position changing with i

            let xIndexHorizontal = xPos / tilesize //variable for inner index
            let yIndexHorizontal = this.y / tilesize //variable for outer index

            if (xIndexHorizontal >= 0 && yIndexHorizontal >= 0 && xIndexHorizontal < board.length && yIndexHorizontal < board.length) { //checks if inner and outer index has a valid board value
                if (board[yIndexHorizontal][xIndexHorizontal] != '-' && board[yIndexHorizontal][xIndexHorizontal] != this && board[yIndexHorizontal][xIndexHorizontal] != 'R') { //checks if the array elements in board equal to the tiles, horizontal from rook, is a piece, that is not a rook
                    break //if there is a piece (not rook) then the program breaks out of the loop
                }
                rect(xPos, this.y, tilesize, tilesize) //draw rectangles for where the rook can be placed horizontal
                if (board[yIndexHorizontal][xIndexHorizontal] == '-' || board[yIndexHorizontal][xIndexHorizontal] == this) { //checks if the array elements in board equal to the tiles, horizontal from rook, is empty 
                    board[yIndexHorizontal][xIndexHorizontal] = 'R' //replaces empty space with a 'R'
                }
            }
        }

        for (let i = 1; i < board.length; i++) { //loop for where the rook can be placed in columns under the rook
            let yPos = this.y + tilesize * i * direction  //varaiable for y position changing with i

            let xIndexVertical = this.x / tilesize //variable for inner index
            let yIndexVertical = yPos / tilesize //variable for outer index


            if (xIndexVertical >= 0 && yIndexVertical >= 0 && xIndexVertical < board.length && yIndexVertical < board.length) { //checks if inner and outer index has a valid board value
                if (board[yIndexVertical][xIndexVertical] != '-' && board[yIndexVertical][xIndexVertical] != this && board[yIndexVertical][xIndexVertical] != 'R') { //checks if the array elements in board equal to the tiles, vertical from rook, is a a piece, that is not a rook
                    break //if there is a piece (not rook) then the program breaks out of the loop
                }
                rect(this.x, yPos, tilesize, tilesize) //draw rectangles for where the rook can be placed
                if (board[yIndexVertical][xIndexVertical] == '-' || board[yIndexVertical][xIndexVertical] == this) { //checks if the array elements in board equal to the tiles, vertical from rook, is empty 
                    board[yIndexVertical][xIndexVertical] = 'R' //replaces empty space with a 'R'
                }
            }
        }
    }
}

class Bishop extends Piece {
    constructor(x, y) {
        super(bishopImgs, x, y)
    }
    rule(directionX, directionY) {
        for (let i = 1; i < board.length; i++) {
            let xPos = this.x + tilesize * i * directionX //variable for x position, changing with i
            let yPos = this.y + tilesize * i * directionY //variable for y position, changing with i

            let innerIndex = xPos / tilesize //variable for inner index
            let outerIndex = yPos / tilesize //variable for outer index

            if (innerIndex >= 0 && outerIndex >= 0 && innerIndex < board.length && outerIndex < board.length) {  //checks if inner and outer index has a valid board value
                if (board[outerIndex][innerIndex] != '-' && board[outerIndex][innerIndex] != this && board[outerIndex][innerIndex] != 'B') { //checks if the array elements diagonal from the bishop is a piece that is not a bishop
                    break //if there is a piece (not bishop) then the program breaks out of the loop
                }
                rect(xPos, yPos, tilesize, tilesize) //draw rectangles for where the bishop can be placed
                if (board[outerIndex][innerIndex] == '-' || board[outerIndex][innerIndex] == this) { //checks if the array elements in board diagonal from bishop is empty or a bishop
                    board[outerIndex][innerIndex] = 'B' //replaces empty space with a 'B'
                }
            }
        }
    }
}

class Knight extends Piece {
    constructor(x, y) {
        super(knightImgs, x, y)
    }
    rule(directionX, directionY) {
        let xPos = this.x + tilesize * directionX //variable for x position, changing with i
        let yPos = this.y + tilesize * directionY //variable for y position, changing with i

        let innerIndex = xPos / tilesize //variable for inner index
        let outerIndex = yPos / tilesize //variable for outer index

        if (innerIndex >= 0 && outerIndex >= 0 && innerIndex < board.length && outerIndex < board.length) { //checks if inner and outer index has a valid board value
            if (board[outerIndex][innerIndex] == 'N') { //checks if there is a 'N' as array elements in board 
                rect(xPos, yPos, tilesize, tilesize) //draw rectangles for where the knight can be placed
            }
            if (board[outerIndex][innerIndex] == '-' || board[outerIndex][innerIndex] == this) { //checks if the array elements in board are empty or is a knight
                board[outerIndex][innerIndex] = 'N' //replaces empty space with 'N'

            }
        }

    }
}

class Pawn extends Piece {
    constructor(x, y) {
        super(pawnImgs, x, y)
    }
    //rule for pawn first move
    rule(steps) {
        for (let i = 0; i < steps; i++) { //loop for where pawn can be
            let yPos = this.y + tilesize * -i //variable for y postion changin with i

            let innerIndex = this.x / tilesize //variable for inner index
            let outerIndex = yPos / tilesize //variable for outer index

            if (innerIndex >= 0 && outerIndex >= 0 && innerIndex < board.length && outerIndex < board.length) { //checks if x and y index has a valid board value
                if (board[outerIndex][innerIndex] == 'P') { //checks if there is a 'P' as array elements in board 
                    rect(this.x, yPos, tilesize, tilesize) //draw rectangles for where the pawn can be placed
                }
                if (board[outerIndex][innerIndex] == '-' || board[outerIndex][innerIndex] == this) { //checks if the array elements in board are empty or is a pawn
                    board[outerIndex][innerIndex] = 'P' //replaces empty space with 'P'
                }
            }
        }
    }
}


