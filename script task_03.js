const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const turnIndicator = document.getElementById('turnIndicator');
const resetButton = document.getElementById('resetButton');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsAIButton = document.getElementById('playerVsAI');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let vsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle player or AI turns
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handlePlayerMove(clickedCell, clickedCellIndex);

    if (vsAI && currentPlayer === 'O' && gameActive) {
        setTimeout(handleAIMove, 500); // AI takes its turn after a delay
    }
}

function handlePlayerMove(clickedCell, index) {
    gameState[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    checkForWinner();
}

function handleAIMove() {
    let availableCells = gameState
        .map((value, index) => (value === '' ? index : null))
        .filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].innerHTML = currentPlayer;
    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.innerHTML = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.innerHTML = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    statusDisplay.innerHTML = '';
    turnIndicator.innerHTML = `Player X's turn`;
}

function setPlayerVsPlayer() {
    vsAI = false;
    resetGame();
}

function setPlayerVsAI() {
    vsAI = true;
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', setPlayerVsPlayer);
playerVsAIButton.addEventListener('click', setPlayerVsAI);
