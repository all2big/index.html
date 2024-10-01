const cells = document.querySelectorAll('.cell');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');
let currentPlayer = 'X';
let gameActive = true;
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

newGameButton.addEventListener('click', resetGame);

function handleCellClick(cell) {
    const index = cell.getAttribute('data-index');
    if (!board[index] && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        showResult(`${currentPlayer} wins!`);
    } else if (!board.includes(null)) {
        gameActive = false;
        showResult('It\'s a draw!');
    }
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.classList.remove('hidden');
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    resultScreen.classList.add('hidden');
    gameActive = true;
    currentPlayer = 'X';
}
