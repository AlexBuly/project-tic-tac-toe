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

    const container = document.querySelector(".container");
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
    let boardFull;

    const reset = () => {
        const resetBtn = document.createElement("button");
        resetBtn.classList.add("resetBtn");
        resetBtn.textContent = "New Game";
        container.appendChild(resetBtn);

        resetBtn.addEventListener("click", () => {
            location.reload();
        });
    }

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const isRunning = () => gameRunning;

    const fullBoard = () => boardFull;

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
            [[0,0], [1,1], [2,2]], // diagonals 
            [[0,2], [1,1], [2,0]]
        ];

        boardFull = true;

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
                reset();
                return;
            }
        }

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (boardState[row][col].getValue() === "_") {
                    boardFull = false;
                    break;
                }
            }
        }

        if (boardFull) {
            gameRunning = false;
            console.log("Tie.");
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
        }
    };
    printNewRound();

    return {
        playRound,
        getActivePlayer,
        checkWin,
        getBoard: board.getBoard,
        isRunning,
        fullBoard
    };
}

const DisplayController = () => {
    const game = GameController();
    const displayMessage = document.querySelector(".text");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const running = game.isRunning();
        const boardFull = game.fullBoard();

        const playerTurnDiv = `${activePlayer.name}'s turn`;
        const winMessage = `${activePlayer.name} wins`
        const tie = 'Tie';

        if (running === false) {
            displayMessage.textContent = winMessage;
            if (boardFull) {
                displayMessage.textContent = tie;
            }
        } else {
            displayMessage.textContent = playerTurnDiv;
        }

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })

    }

    const clickHandlerBoard = (e) => {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        
        if (!selectedColumn || !selectedRow) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
}

DisplayController();

