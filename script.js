/*
This game will have a board, 2 players. The game will switch between players after their turn. When
3 in a row is achieved, the player wins. If no player wins, a tie occurs. 
 */

// gameboard object 
const Gameboard = () => {
    const board = [["_","_","_"],["_", "_", "_"], ["_","_","_"]];
    
    const printBoard = () => {
        console.log(board);
    }


    // inserting values 
    const insert = (row, col, val) => {
        if (row == 0) {
            if (col == 0) {
                board[0].splice(0, 1, val);
            }
            if (col == 1) {
                board[0].splice(1, 1, val);
            }
            if (col == 2) {
                board[0].splice(2, 1, val);
            }
        }
        if (row == 1) {
            if (col == 0) {
                board[1].splice(0, 1, val);
            }
            if (col == 1) {
                board[1].splice(1, 1, val);
            }
            if (col == 2) {
                board[1].splice(2, 1, val);
            }
        }
        if (row == 2) {
            if (col == 0) {
                board[2].splice(0, 1, val);
            }
            if (col == 1) {
                board[2].splice(1, 1, val);
            }
            if (col == 2) {
                board[2].splice(2, 1, val);
            }
        }
        return board;
    }

    const playerOneName = prompt("Enter player one name")
    const playerTwoName = prompt("Enter player two name")


    // players 
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ]

    console.log(players);
    printBoard()
    return { insert, printBoard };
}

const game = Gameboard();

