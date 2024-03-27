/*
This game will have a board, 2 players. The game will switch between players after their turn. When
3 in a row is achieved, the player wins. If no player wins, a tie occurs. 
 */

// gameboard object 
const Gameboard = {
    gameBoard: [["_","_","_"],["_", "_", "_"], ["_","_","_"]]
}
const insert = (start, del, a, b ,c) => {
    Gameboard.gameBoard.splice(start, del, [a, b ,c]);
    return Gameboard.gameBoard;
}
console.log(Gameboard.gameBoard);


// players 
const players = {
    player1: "X",
    player2: "O",
}

console.log(players);


