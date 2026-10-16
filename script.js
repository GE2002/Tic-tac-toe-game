const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const multiplayerBtn = document.getElementById('multiplayer');
const aiBtn = document.getElementById('ai-mode');


/* Games settings */
let currentPlayer = 'X';
let gameActive = true;
let vsAI = false;


/* Ways to win */
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];


/* Game modes */
multiplayerBtn.addEventListener('click', () => {
    vsAI = false;
    restartGame();
});

aiBtn.addEventListener('click', () => {
    vsAI = true;
    restartGame();
});


/* Board clicks */
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);


/* Plays a turn */
function handleCellClick(event) {
    const cell = event.target;

    // Stops if the spot is taken
    if (cell.innerHTML !== '' || !gameActive) return;

    makeMove(cell);

    // Gives the computer a turn
    if (vsAI && gameActive && currentPlayer === 'O') {
        setTimeout(aiMove, 500);
    }
}


/* Adds a heart */
function makeMove(cell) {
    const heart = document.createElement("img");
    heart.classList.add("heart");

    // Chooses the heart color
    if (currentPlayer === "X") {
        heart.src = "images/pink-heart.svg";
    } else {
        heart.src = "images/blue-heart.svg";
    }

    cell.appendChild(heart);

    if (checkWinner()) return;

    // Switches players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


/* Computer turn */

function aiMove() {
    const emptyCells = [...cells].filter(cell => cell.innerHTML === '');

    if (emptyCells.length === 0) return;

    // Picks a random empty spot
    const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    makeMove(randomCell);
}


/* Checks the game */

function checkWinner() {
    for (let condition of winConditions) {
        const [a,b,c] = condition;

        if (
            cells[a].innerHTML &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML
        ) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');

            alert("Someone wins! Congratulations!");
            gameActive = false;
            return true;
        }
    }

    // Checks for a draw
    if ([...cells].every(cell => cell.innerHTML !== '')) {
        alert("It's a draw!");
        gameActive = false;
        return true;
    }

    return false;
}


/* Restarts the game */

function restartGame() {
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winner');
    });

    currentPlayer = 'X';
    gameActive = true;
}