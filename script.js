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

    const getBoard = () => board;

    const insert = (row, col, player) => {
        if (board[row][col].getValue() === "") {
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
    let val = "";

    const addToken = (player) => {
        val = player;
    }

    const getValue = () => val;

    return { addToken, getValue };
}

const GameController = (
    playerOneName = prompt("Enter player one name:"),
    playerTwoName = prompt("Enter player two name:")
) => {

    const container = document.querySelector("body");
    const board = Gameboard();
    const players = [
        { name: playerOneName, 
          token: "X" 
        },
        { 
            name: playerTwoName, 
            token: "O" 
        }
    ];

    let activePlayer = players[0];
    let gameRunning = true;
    let gameResult = null;

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

    const getResult = () => gameResult;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const checkWin = () => {
        const boardState = board.getBoard();
        const winPatterns = [
            [[0, 0], [0, 1], [0, 2]], // rows
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]], // columns
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]], // diagonals
            [[0, 2], [1, 1], [2, 0]]
        ];

        let winner = false;

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            const [aRow, aCol] = a;
            const [bRow, bCol] = b;
            const [cRow, cCol] = c;

            if (
                boardState[aRow][aCol].getValue() !== "" &&
                boardState[aRow][aCol].getValue() === boardState[bRow][bCol].getValue() &&
                boardState[aRow][aCol].getValue() === boardState[cRow][cCol].getValue()
            ) {
                gameRunning = false;
                gameResult = "win";
                winner = true;
                reset();
            }
        }

        if (!winner) {
            let boardFull = true;
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (boardState[row][col].getValue() === "") {
                        boardFull = false;
                        break;
                    }
                }
                if (!boardFull) break;
            }

            if (boardFull) {
                gameRunning = false;
                gameResult = "tie";
                reset();
            }
        }
    };

    const playRound = (row, col) => {
        if (!gameRunning) {
            console.log("Game over. Please restart the game.");
            return;
        }
        board.insert(row, col, getActivePlayer().token);
        checkWin();
        if (gameRunning) {
            switchTurn();
            printNewRound();
        }
        //
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        isRunning,
        getResult
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
        const result = game.getResult();
        const colorX = document.getElementById("color-selectX");
        const colorO = document.getElementById("color-selectO");

        // Options for game state message
        const playerTurnDiv = `${activePlayer.name}'s turn`;
        const winMessage = `${activePlayer.name} wins!`;
        const tieMessage = 'Tie';

        if (!running) {
            if (result === "tie") {
                displayMessage.textContent = tieMessage;
            } else {
                displayMessage.textContent = winMessage;
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
                if (cellButton.textContent === "X") {
                    cellButton.style.color = colorX.value;
                } else {
                    cellButton.style.color = colorO.value;
                }
                boardDiv.appendChild(cellButton);
            });
        });
    }

    const clickHandlerBoard = (e) => {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn || !selectedRow) return;

        game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
}

DisplayController();
