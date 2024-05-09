/*
This game will have a board, 2 players. The game will switch between players after their turn. When
3 in a row is achieved, the player wins. If no player wins, a tie occurs. 
 */

// gameboard object 
const Gameboard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
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
        board[row][col].addToken(val);
    }
   
    printBoard()
    return { insert, printBoard };
}

const Cell = () => {
    let value = "_";

    const addToken = (player) => {
        value = player
    }

    const getValue = () => value;

    return {
        getValue,
        addToken
    }
}

const GameController = (
    playerOneName = prompt("Enter player one name:"),
    playerTwoName = prompt("Enter player two name:")
) => {
    const board = Gameboard();
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
    ]; 

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, col) => {
        board.insert(row, col, getActivePlayer.token());

        switchTurn();
        printNewRound();
    };
    printNewRound();

    return {
        playRound,
        getActivePlayer
    }

}

const game = Gameboard();

