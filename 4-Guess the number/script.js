const form = document.querySelector(".guess_form")
const submit = document.querySelector(".submit_btn")
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset_btn");
const guesses_remaining = document.querySelector(".guesses_remaining .guesses");
const guessInput = document.querySelector(".guess_input");
const previousGuesses = document.querySelector(".previous_guesses .guesses")

const TOTAL_GUESSES = 6;
let previous_guesses = [];
let current_guesses_remaining = 0;

let randomNumber = generateRandomNumber();

resetBtn.addEventListener("click", resetGame);

guesses_remaining.innerHTML = TOTAL_GUESSES - current_guesses_remaining;

console.log(randomNumber);
form.addEventListener("submit", function (e) {
    e.preventDefault()
    const inputValue = parseInt(document.querySelector(".guess_input").value);
    validateGuess(inputValue, randomNumber)
})


function generateRandomNumber() {
    let number = Math.floor(Math.random() * 100 + 1)
    return number
}

function validateGuess(currentGuess, correctGuess) {

    if (currentGuess > 100 || currentGuess < 1 || isNaN(currentGuess)) {
        displayMessage("Please Enter a valid Number", "red")
    } else {

        previous_guesses.push(currentGuess);
        if (current_guesses_remaining == TOTAL_GUESSES - 1) {
            displayGuess(currentGuess);
            if (!checkGuess(currentGuess, correctGuess)) {
                displayMessage(`Game Over! The Random number was ${randomNumber}`, "red")
            }
            endGame();
        } else {
            displayGuess(currentGuess);
            displayMessage("")
            checkGuess(currentGuess, correctGuess)
        }
    }
}

function resetGame() {
    randomNumber = generateRandomNumber();
    result.innerHTML = "";
    guessInput.removeAttribute("disabled");
    submit.style.display = "inline-block";
    resetBtn.style.width = "25%";

    previous_guesses = [];
    document.querySelector(".previous_guesses .guesses").innerHTML = "";

    guesses_remaining.innerHTML = TOTAL_GUESSES;
    current_guesses_remaining = 0;
}

function displayMessage(message, color = "black") {
    result.innerHTML = message;
    result.style.color = color;
}

function checkGuess(currentGuess, correctGuess) {
    if (currentGuess > correctGuess) {
        if ((currentGuess - correctGuess) > 15) {
            displayMessage("Your Guess is too high")
        } else {
            displayMessage("Your Guess is little higher than randomNumber")
        }
        return false;
    } else if(currentGuess < correctGuess) {
        if ((correctGuess - currentGuess) > 15) {
            displayMessage("Your Guess is too low")
        } else {
            displayMessage("Your Guess is little lower than randomNumber")
        }
        return false;
    } else {
        displayMessage("Congrats! You Guess is correct", "green")
        endGame();
        return true;
    } 
}

function displayGuess(guess) {
    guessInput.value = "";
    previousGuesses.innerHTML = previous_guesses.join(", ")
    current_guesses_remaining++;
    guesses_remaining.innerHTML = TOTAL_GUESSES - current_guesses_remaining;
}

function endGame() {
    guessInput.blur()
    guessInput.value = "";
    guessInput.setAttribute("disabled", "")
    submit.style.display = "none";
    resetBtn.style.width = "50%";
}