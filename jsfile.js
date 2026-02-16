

const Player = (name, marker) => {
    return {name, marker};
};


const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const Gameboard = (() => {
    const size = 3;
    let board = Array.from({length: size}, () => Array(size).fill(''));

    const getBoard = () => board;

    const resetBoard = () => {
        board = Array.from({length: size}, () => Array(size).fill(''));
    };

    const addMarker = (marker, row, col) => {
        if (board[row][col] === ''){
            board[row][col] = marker;
            return true
        }
        return false;
    };

    return {getBoard, resetBoard, addMarker};

})();

const DOMController = ((gameboard) => {
    const boardElement = document.getElementById('game-board');
    const messageElement = document.getElementById('game-message');

    const initializeBoard = (game) => {
        boardElement.innerHTML = ''
        const board = gameboard.getBoard();

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => game.playTurn(row, col));
                boardElement.appendChild(cell);
            }
        }
    };

    const updateBoard = (row, col, marker) => {
        const cell = boardElement.querySelector (`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = marker;
    };

    const setMessage = (message) => {
        messageElement.textContent = message;
    };

    const addResetButtonListener = (game) => {
        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => game.resetGame());
    };

    return {initializeBoard, updateBoard, setMessage, addResetButtonListener};

})(Gameboard);

const Game = ((player1, player2, gameboard, domController) => {
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = (board, marker) => {
        const size = board.length;

        for (let i = 0; i < size; i++){
            if (board[i].every(cell => cell === marker)) return true;
            if (board.every(row => row[i] === marker)) return true;
        }

        if (board.every((row, idx) => row[idx] === marker)) return true;
        if (board.every((row, idx) => row[board.length - 1 - idx] === marker)) return true;

        return false;
    };

    const checkTie = (board) => {
        return board.flat().every(cell => cell === player1.marker || cell === player2.marker);
    };

    const playTurn = (row, col) => {
        if (gameOver) return;

        if (gameboard.addMarker(currentPlayer.marker, row, col)){
            const board = gameboard.getBoard();

            domController.updateBoard(row, col, currentPlayer.marker);

            if (checkWin(board, currentPlayer.marker)){
                domController.setMessage(`${currentPlayer.name} wins!`);
                gameOver = true;
                return;
            }
            if (checkTie(board)) {
                domController.setMessage("It's a tie!");
                gameOver = true;
                return;
            }

            switchPlayer();
            domController.setMessage(`It's ${currentPlayer.name} turn`);
        } else {
            domController.setMessage("Spot already taken!");
        }
    };

    const resetGame = () => {
        gameboard.resetBoard();
        domController.initializeBoard(Game);
        domController.setMessage(`It's ${player1.name} turn`);
        currentPlayer = player1;
        gameOver = false;
    }

    return {playTurn, resetGame};

})(player1, player2, Gameboard, DOMController);

DOMController.initializeBoard(Game);
DOMController.setMessage(`It's ${player1.name} turn`);
DOMController.addResetButtonListener(Game);



