const choices = document.querySelectorAll(".choice");
const resultText = document.querySelector("#result-text");
const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const resetButton = document.querySelector("#reset");

let playerScore = 0;
let computerScore = 0;
const maxScore = 5;

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (playerScore < maxScore && computerScore < maxScore) {
            const playerChoice = choice.id;
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);

            updateScore(result);
            resultText.innerText = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;

            if (playerScore === maxScore) {
                resultText.innerText = "Congratulations! You won the game!";
            } else if (computerScore === maxScore) {
                resultText.innerText = "Computer wins the game! Better luck next time.";
            }
        }
    });
});

resetButton.addEventListener("click", resetGame);

function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a draw!";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function updateScore(result) {
    if (result === "You win!") {
        playerScore++;
        playerScoreElement.innerText = playerScore;
    } else if (result === "You lose!") {
        computerScore++;
        computerScoreElement.innerText = computerScore;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.innerText = playerScore;
    computerScoreElement.innerText = computerScore;
    resultText.innerText = "Make your choice!";
}