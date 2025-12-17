let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function showResetConfirmation() {
  const html = `
    <div class="confirm-content">
        <p>Are you sure you want to reset the score?</p>
        <button class="yes-button js-yes-reset">Yes</button>
        <button class="no-button js-no-reset">No</button>
    </div>
  `;
  document.querySelector('.js-div').innerHTML = html;
  
  // Attach new listeners dynamically
  document.querySelector('.js-yes-reset').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });
  
  document.querySelector('.js-no-reset').addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  document.querySelector('.js-div').innerHTML = '';
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  showResetConfirmation();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000); // Faster, more exciting
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    document.querySelector('.js-auto-play-button').classList.add('active-glow');
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    document.querySelector('.js-auto-play-button').classList.remove('active-glow');
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  const resultElement = document.querySelector('.js-result');
  resultElement.innerHTML = result;
  
  // Add color classes for feedback
  resultElement.className = 'js-result result-text'; // reset
  if (result === 'You win.') resultElement.classList.add('win-text');
  if (result === 'You lose.') resultElement.classList.add('lose-text');

  document.querySelector('.js-moves').innerHTML = `
    <div class="move-container">
        <p>You</p>
        <img src="assets/${playerMove}-emoji.png" class="move-icon">
    </div>
    <div class="vs-text">VS</div>
    <div class="move-container">
        <p>CPU</p>
        <img src="assets/${computerMove}-emoji.png" class="move-icon">
    </div>`;
}

function updateScoreElement() {
    document.querySelector('.js-wins').innerText = score.wins;
    document.querySelector('.js-losses').innerText = score.losses;
    document.querySelector('.js-ties').innerText = score.ties;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}
