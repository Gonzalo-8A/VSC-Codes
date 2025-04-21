let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();


let isAutoPlaying = false;
let intervalId;


function autoPlay (){
  const autoPlayElement = document.querySelector('.js-autoPlay');
  
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const move = pickComputerMove();
      playGame(move);
    }, 1300);
    isAutoPlaying = true;
    autoPlayElement.innerHTML = 'Stop Auto Play';

    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      autoPlayElement.innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result')
      .innerHTML = '';
    document.querySelector('.js-moves')
      .innerHTML = '';
  }

document.querySelector('.js-autoPlay')
  .addEventListener('click', () => {
    autoPlay();
  });


function resetMessage() {
  const resetMessage = document.querySelector('.js-resetScore-message');

  resetMessage.classList.remove('hideElement');

  resetMessage.innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-yes-button">Yes</button>
      <button class="js-no-button">No</button>
      `;

  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScore();
      resetMessage.innerHTML = '';
      resetMessage.classList.add ('hideElement');
    });

  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      resetMessage.innerHTML = '';
      resetMessage.classList.add ('hideElement');
    });
}

  document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
     resetMessage();
    });

  // keydownEvents
  document.body
    .addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      } else if (event.key === 'a') {
        autoPlay();
      } else if (event.key === ' ') {
        resetMessage();
      }
    })

  
function playGame(move) {

  const computerMove = pickComputerMove();

  let result = '';

  
  if(move === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if(move === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if(move === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }
  

  if(result === 'You win.') {
    score.wins += 1;
  } else if(result === 'You lose.') {
    score.losses +=1;
  } else if (result === 'Tie.') {
    score.ties +=1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = `${result}`;


  
  document.querySelector('.js-moves')
    .innerHTML = `You <img src="images/${move}-emoji.png" alt=""> - <img src="images/${computerMove}-emoji.png" alt=""> Computer`
  
  updateScoreElement();

}

function updateScoreElement () {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >=0 && randomNumber <1/3) {
    computerMove = 'rock';
  } else if (randomNumber >=0 && randomNumber <2/3) {
    computerMove = 'paper';
  } else if (randomNumber >=0 && randomNumber <1) {
    computerMove = 'scissors';
  }

  return computerMove;
}
