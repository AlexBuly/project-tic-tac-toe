/*
This game will have a board, 2 players. The game will switch between players after their turn. When
3 in a row is achieved, the player wins. If no player wins, a tie occurs. 
 */

// gameboard object 
const Gameboard = (addToken) => {
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

    // inserting values 
    const insert = (row, col, player) => {
        if (board[row][col].getValue() === "_") {
            board[row][col].addToken(player);
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return { insert, printBoard, getBoard };
}

const Cell = () => {
    let val = "_";

    const addToken = (player) => {
        val = player
    }

    const getValue = () => val;

    return {
        addToken,
        getValue
    };
}

const GameController = (
    playerOneName = prompt("Enter player one name:"),
    playerTwoName = prompt("Enter player two name:")
) => {
    const board = Gameboard(/*Cell().addToken*/);
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

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, col) => {
        board.insert(row, col, getActivePlayer().token);

        switchTurn();
        printNewRound();
    };
    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();

