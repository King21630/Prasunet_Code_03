// Game constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

let currentPlayer = PLAYER_X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle user click on a cell
function handleClick(index) {
    if (gameActive && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWin(currentPlayer)) {
            document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            document.getElementById('resetButton').disabled = false; // Enable the reset button
        } else if (!gameBoard.includes('')) {
            document.getElementById('status').textContent = "It's a draw!";
            gameActive = false;
            document.getElementById('resetButton').disabled = false; // Enable the reset button
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
            if (currentPlayer === PLAYER_O) {
                setTimeout(() => aiMove(), 500); // Delay AI move for demonstration
            }
        }
    }
}

// Function to check if a player has won
function checkWin(player) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === player;
        });
    });
}

// Function to reset the game
function resetGame() {
    currentPlayer = PLAYER_X;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
    renderBoard();
    document.getElementById('resetButton').disabled = true; // Disable the reset button
}

// Function to update the UI with current game state
function renderBoard() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = gameBoard[i];
        cells[i].className = `cell ${gameBoard[i]}`;
    }
}

// Basic AI Move
function aiMove() {
    let emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        let aiIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[aiIndex] = currentPlayer;
        renderBoard();
        if (checkWin(currentPlayer)) {
            document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            document.getElementById('resetButton').disabled = false; // Enable the reset button
        } else if (!gameBoard.includes('')) {
            document.getElementById('status').textContent = "It's a draw!";
            gameActive = false;
            document.getElementById('resetButton').disabled = false; // Enable the reset button
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            document.getElementById('status').textContent = `Current Player: ${currentPlayer}`;
        }
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('resetButton').disabled = true; // Disable the reset button initially
});
