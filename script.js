// Initialize both the player's and computer's score to 0.
let playerScore = computerScore = 0;

// By default, the game is first to 5. Can be changed via drop-down.
let firstTo = 5;

// Add the options 1-100 to the drop-down, and set the default option to 5.
let sel = document.querySelector('select');
for (let i = 0; i<100; i++) { sel[i] = new Option(i+1, i+1); }
sel.selectedIndex = firstTo - 1;
document.querySelector('select').addEventListener('change', e => firstTo = Number(e.target.value));

// Add an event listener for when the player clicks rock, paper, or scissors.
let btns = document.querySelectorAll('img.player');
btns.forEach(btn => btn.addEventListener('click', clickHandler));

// Function that handles the player's selection of rock, paper, or scissors.
function clickHandler(e) {
    // Store the player's selection, computer's selection, and compute the winner.
    let playerSelection = e.target.id,
        computerSelection = computerPlay(),
        winner = playRound(playerSelection, computerSelection);

    // Deselect all images, and then select only the two images corresponding to the player's and computer's selection.
    document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
    document.querySelector(`.player#${playerSelection}`).classList.add('selected');
    document.querySelector(`.computer#${computerSelection}`).classList.add('selected');

    // If the player wins: increment their score, and let them know through text and audio that they won the round.
    if (winner == 'player') {
        playerScore++;
        document.querySelector('.player.score').textContent = `Player: ${playerScore}`;
        document.querySelector('.results').textContent = `You won the round! ${playerSelection} beats ${computerSelection}.`;
        document.querySelector('audio.win').currentTime = 0;
        document.querySelector('audio.win').play();
    }
    // If the player loses: increment the computer's score, and let them know through text and audio that they lost the round.
    else if (winner == 'computer') {
        computerScore++;
        document.querySelector('.computer.score').textContent = `Computer: ${computerScore}`;
        document.querySelector('.results').textContent = `You lost the round! ${computerSelection} beats ${playerSelection}.`;
        document.querySelector('audio.loss').currentTime = 0;
        document.querySelector('audio.loss').play();
    }
    // If it's a tie: let the player know through text and audio that the round is tied.
    else {
        document.querySelector('.results').textContent = `The round is tied! ${playerSelection} vs. ${computerSelection}.`;
        document.querySelector('audio.tie').currentTime = 0;
        document.querySelector('audio.tie').play();
    }

    // If the player or computer have enough points to win: display the endgame message/image and restart button.
    if (playerScore == firstTo || computerScore == firstTo) {
        msg = playerScore > computerScore ? `You won the game by a score of ${playerScore}-${computerScore}.` : 
            `You lost the game by a score of ${computerScore}-${playerScore}.`;
        img = playerScore > computerScore ? './images/you-win.jpg' : './images/you-lose.gif';
        document.querySelector('#endgame-msg').textContent = msg;
        document.querySelector('#endgame-img').src = img;
        document.querySelector('.game').classList.add('invisible');
        document.querySelector('.endgame').classList.remove('invisible');
        playerScore = computerScore = 0;
        document.querySelector('.player.score').textContent = `Player: ${playerScore}`;
        document.querySelector('.computer.score').textContent = `Computer: ${computerScore}`;
    }

    // Only enable the "First To" selector if both players have 0 points.
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
