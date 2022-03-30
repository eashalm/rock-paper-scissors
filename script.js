// Returns a pseudorandom integer in the interval [min, max), where min and max are integers with min < max.
function randInt(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

// Simulates a computer rock-paper-scissors player by "randomly" returning either 'rock', 'paper', or 'scissors'.
function computerPlay() {
    let generatedNum = randInt(0,3);

    if (generatedNum == 0) {
        return 'rock';
    }
    else if (generatedNum == 1) {
        return 'paper';
    }
    else {
        return 'scissors';
    }
}

// "Plays" a single round of rock-paper-scissors by returning a string declaring the winner of the round (if any).
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    let winner;
    
    // Determines who the winner is (player or computer).
    if (playerSelection == 'rock') {
        winner = computerSelection == 'scissors' ? 'player' : (computerSelection == 'paper' ? 'computer' : undefined);
    }
    else if (playerSelection == 'paper') {
        winner = computerSelection == 'rock' ? 'player' : (computerSelection == 'scissors' ? 'computer' : undefined);
    }
    else {
        winner = computerSelection == 'paper' ? 'player' : (computerSelection == 'rock' ? 'computer' : undefined);
    }

    // Returns a string based on who the winner is. If no winner, declares a tie.
    if (winner == 'player') {
        return `You won the round! ${playerSelection} beats ${computerSelection}.`;
    }
    else if (winner == 'computer') {
        return `You lost the round! ${computerSelection} beats ${playerSelection}.`;
    }
    else {
        return `Tie! ${playerSelection} === ${computerSelection}.`;
    }
  }

// "Plays" an n-round game of rock-paper-scissors by logging the result of each round, and the overall winner, in the console.
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
}
