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

    // inserting values 
    const insert = (row, col, player) => {
        if (board[row][col].getValue() === "_") {
            board[row][col].addToken(player)
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
    let gameRunning = true;

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }
 
    const checkWin = () => {
        const boardState = board.getBoard();
        const winPatterns = [
            [[0,0], [0,1], [0,2]], //rows
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            [[0,0], [1,0], [2,0]], // columns
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]

        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            const [aRow, aCol] = a;
            const [bRow, bCol] = b;
            const [cRow, cCol] = c;

            if (
                boardState[aRow][aCol].getValue() !== "_" &&
                boardState[aRow][aCol].getValue() === boardState[bRow][bCol].getValue() &&
                boardState[aRow][aCol].getValue() === boardState[cRow][cCol].getValue()
            ) {
                gameRunning = false;
                return;
            }
        }
    };
    

    const playRound = (row, col) => {
        if (gameRunning == false) {
            console.log("Game over. Please restart the game.");
            return;
        }
        board.insert(row, col, getActivePlayer().token);
        checkWin();

        if (gameRunning == true) {
            switchTurn();
            printNewRound();
        } else {
            console.log(`${getActivePlayer().name} wins`);
            //return;
        }
    };
    printNewRound();

    return {
        playRound,
        getActivePlayer,
        checkWin
    };
}

const game = GameController();

