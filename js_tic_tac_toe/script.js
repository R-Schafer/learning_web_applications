// Global
let turn = 'X'
const cols = document.querySelectorAll('.col')

// Event Listeners
function main() {

    // play again and refresh
    const button = document.querySelector('#end-message button')
    button.addEventListener('click', () => window.location.reload())

    // placing the X's and O's 
    const board = document.getElementById('board')
    board.addEventListener('click', takeTurn)
}


// placing the X's and O's function
function takeTurn(e) {

    // making sure you can't play ontop of another player
    if (e.target.textContent !== '') {
        return
    }

    // if spot is valid
    if (turn === 'X') {
        e.target.textContent = 'X'
        turn = 'O'
    } else {
        e.target.textContent = 'O'
        turn = 'X'
    }

    // check to see if the last move was a winning move or a tie
    const winner = checkWinner();
    if (winner === "X" || winner === "O") {
        document.getElementById('end-message').hidden = false;
        document.querySelector('#end-message h2').textContent = `${winner} wins!`
    } else if (checkTie()) {
        document.getElementById('end-message').hidden = false;
        document.querySelector('#end-message h2').textContent = "It's a Tie!"
    }
}

// checking board for a winner

// checking each winning combination
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        if (allSame(winningCombinations[i])) {
            return cols[winningCombinations[i][0]].textContent
        }
    }
    return false
}

// checking the values in each winning combination
function allSame(winningCombination) {
    for (let j = 0; j < winningCombination.length - 1; j++) {
        if (cols[winningCombination[j]].textContent !== cols[winningCombination[j + 1]].textContent) {
            return false
        }
    }
    return true
}

// checking for a tie
function checkTie() {
    for (let i = 0; i < cols.length; i++) {
        if (cols[i].textContent === '') {
            return false
        }
    }
    return true
}

main()