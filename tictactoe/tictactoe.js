let boxes = document.querySelectorAll(".cell");
let resetbtn = document.querySelector("#reset");

let turn0 = true;  // "0" starts first

const winPatterns = [
    [0, 1, 2],  // Top row
    [3, 4, 5],  // Middle row
    [6, 7, 8],  // Bottom row
    [0, 3, 6],  // Left column
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column
    [0, 4, 8],  // Diagonal from top-left to bottom-right
    [2, 4, 6]   // Diagonal from top-right to bottom-left
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {  // Only allow empty boxes to be clicked
            if (turn0) {
                box.innerText = "0";  // Place "0"
                turn0 = false;  // Switch to "X" for the next turn
            } else {
                box.innerText = "X";  // Place "X"
                turn0 = true;  // Switch to "0" for the next turn
            }

            if (checkWin()) {  // Check if the current move wins the game
                alert(box.innerText + " wins!");
                resetGame();  // Reset the game after a win
            } else if (isDraw()) {  // Check if the game is a draw
                alert("It's a draw!");
                resetGame();  // Reset the game after a draw
            }
        }
    });
});

// Reset the game when the reset button is clicked
resetbtn.addEventListener("click", resetGame);

// Function to check if a player has won
function checkWin() {
    for (let pattern of winPatterns) {
        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if (boxes[a].innerText !== "" && 
            boxes[a].innerText === boxes[b].innerText && 
            boxes[a].innerText === boxes[c].innerText) {
            return true;  // Return true if a winning pattern is found
        }
    }
    return false;  // Return false if no win pattern is found
}

// Function to check if the game is a draw
function isDraw() {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;  // Return false if any box is still empty
        }
    }
    return true;  // Return true if all boxes are filled and no winner
}

// Function to reset the game
function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";  // Clear all cells
    });
    turn0 = true;  // Reset to starting turn (player "0")
}

