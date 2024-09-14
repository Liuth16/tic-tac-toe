
const rows = 3
const columns = 3
const board = []

for (let i = 0; i < rows; i++){
    const a = [];
    board.push(a);
    for (let j = 0; j < columns; j++){
        a.push(`${i},${j}`);
    }
};

function addMarker(marker, board){
    const mark = (r, c) => {
        if (board[r][c] !== "X" && board[r][c] !== "O" ){
            board[r][c] = marker;
            return board;
        }
        return "Spot already taken"
    };
    return mark;
}

function checkWin(board, marker){
    const size = board.length;
    // Check for horizontal win
    for (let i = 0; i < size; i++){
        let horizontalWin = true;
        for (let j = 0; j < size; j++){
            if (board[i][j] !== marker) {
                horizontalWin = false;
                break;
            }
        }
        if (horizontalWin) return true;
    }
    // check for vertical win
    for (let i = 0; i < size; i++){
        let verticalWin = true;
        for (j = 0; j < size; j++){
            if (board[j][i] !== marker){
                verticalWin = false;
                break;
            }
        }
        if (verticalWin) return true;
    }
    // check for left-top to bottom-right diagonal win
    let diagonal1Win = true;
    for (let i = 0; i < size; i++){
        if (board[i][i] !== marker){
            diagonal1Win = false;
            break;
        }
    }
    if (diagonal1Win) return true;
    // check for right-top bottom-left diagonal win
    let diagonal2Win = true;
    for (let i=0; i < size; i++) {
        if (board[i][size-1-i] !== marker){
            diagonal2Win = false;
            break;
        }
    }
    if (diagonal2Win) return true;

    return false
}

function checkTie (board){
    const size = board.length;
    for (let i=0; i < size; i++){
        for (let j = 0; j < size; j++){
            if ((board[i][j] !== "X" && board[i][j] !== "O")){
                return false;
            } 
        }
    }
    return true;
}

