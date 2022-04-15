// Initialize both the player's and computer's score to 0.
let playerScore = computerScore = 0;
// By default, game is first to 5. Can be changed via drop-down.
let firstTo = 3;

let sel = document.createElement('select');
for (let i = 0; i<100; i++) { sel[i] = new Option(i+1, i+1); }
sel.selectedIndex = firstTo - 1;
document.querySelector('.first-to').insertAdjacentElement('afterend', sel);

document.querySelector('select').addEventListener('change', e => firstTo = Number(e.target.value));

let btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', clickHandler));

function clickHandler(e) {
    let playerSelection = e.target.className,
        computerSelection = computerPlay(),
        winner = playRound(playerSelection, computerSelection);
    if (winner == 'player') {
        playerScore++;
        document.querySelector('.player-score').textContent = `Player: ${playerScore}`;
        document.querySelector('.results').textContent = `You won the round! ${playerSelection} beats ${computerSelection}.`;
    }
    else if (winner == 'computer') {
        computerScore++;
        document.querySelector('.computer-score').textContent = `Computer: ${computerScore}`;
        document.querySelector('.results').textContent = `You lost the round! ${computerSelection} beats ${playerSelection}.`;
    }
    else {
        document.querySelector('.results').textContent = `Tie! ${playerSelection} === ${computerSelection}.`;
    }

    if (playerScore == firstTo || computerScore == firstTo) {
        msg = playerScore > computerScore ? `You won the game by a score of ${playerScore}-${computerScore}` : 
            `You lost the game by a score of ${computerScore}-${playerScore}.`;
        document.querySelector('.results').textContent = msg;
        playerScore = computerScore = 0;
        document.querySelector('.player-score').textContent = `Player: ${playerScore}`;
        document.querySelector('.computer-score').textContent = `Computer: ${computerScore}`;
    }

    if (playerScore != 0 || computerScore != 0) { document.querySelector('select').setAttribute('disabled', true); }
    if (playerScore == 0 && computerScore == 0) { document.querySelector('select').removeAttribute('disabled'); }
}

// Returns a pseudorandom integer in the interval [min, max), where min and max are integers with min < max.
function randInt(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

// Simulates a computer rock-paper-scissors player by "randomly" returning either 'rock', 'paper', or 'scissors'.
function computerPlay() {
    let generatedNum = randInt(0,3);

    if ( generatedNum == 0 ) { return 'rock'; }
    else if ( generatedNum == 1 ) { return 'paper'; }
    else { return 'scissors'; }
}

// "Plays" a single round of rock-paper-scissors by returning a string declaring the winner of the round (if any).
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    
    // Determines who the winner is (player or computer).
    if (playerSelection == 'rock') {
        return computerSelection == 'scissors' ? 'player' : 
        (computerSelection == 'paper' ? 'computer' : undefined);
    }
    else if (playerSelection == 'paper') {
        return computerSelection == 'rock' ? 'player' : 
        (computerSelection == 'scissors' ? 'computer' : undefined);
    }
    else {
        return computerSelection == 'paper' ? 'player' : 
        (computerSelection == 'rock' ? 'computer' : undefined);
    }
  }

/* "Plays" an n-round game of rock-paper-scissors by logging the result of each round, and the overall winner, in the console.
function game(numRounds) {
    let numWon = numLost = 0;

    for (let i = 0; i < numRounds; i++) {
        // Play a round and store the result in a variable, then log the result in the console.
        playerSelection = window.prompt("Rock, paper, or scissors?").trim();
        computerSelection = computerPlay();
        roundResult = playRound(playerSelection, computerSelection);
        console.log(roundResult);

        // If the player won the round, increment numWon. If they lost, increment numLost.
        if ( roundResult.includes('won') ) { numWon++; }
        else if ( roundResult.includes('lost') ) { numLost++; }
    }

    // Log the result of the game (win, loss, or draw) to the console.
    if ( numWon > numLost ) { console.log(`You won the game with a score of ${numWon}-${numLost}.`) }
    else if ( numLost > numWon ) { console.log(`You lost the game with a score of ${numLost}-${numWon}.`) }
    else { console.log(`The game is drawn with a score of ${numWon}-${numLost}.`) }
} */
