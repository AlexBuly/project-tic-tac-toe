/*
This game will have a board, 2 players. The game will switch between players after their turn. When
3 in a row is achieved, the player wins. If no player wins, a tie occurs. 
 */

// gameboard object 
const Gameboard = {
    gameBoard: [["_","_","_"],["_", "_", "_"], ["_","_","_"]]
}
const insert = (row, col, val) => {
    if (row == 0) {
        if (col == 0) {
            Gameboard.gameBoard[0].splice(0, 1, val);
        }
        if (col == 1) {
            Gameboard.gameBoard[0].splice(0, 1, val);
        }
        if (col = 2) {
            Gameboard.gameBoard[0].splice(0, 1, val);
        }
    }
    if (row == 1) {
        if (col == 0) {
            Gameboard.gameBoard[1].splice(0, 1, val);
        }
        if (col == 1) {
            Gameboard.gameBoard[1].splice(0, 1, val);
        }
        if (col = 2) {
            Gameboard.gameBoard[1].splice(0, 1, val);
        }
    }
    if (row == 2) {
        if (col == 0) {
            Gameboard.gameBoard[2].splice(0, 1, val);
        }
        if (col == 1) {
            Gameboard.gameBoard[2].splice(0, 1, val);
        }
        if (col = 2) {
            Gameboard.gameBoard[2].splice(0, 1, val);
        }
    }
    return Gameboard.gameBoard;
}
console.log(Gameboard.gameBoard);


// players 
const players = {
    player1: "X",
    player2: "O",
}

console.log(players);


