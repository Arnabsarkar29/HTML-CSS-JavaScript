'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let scores;
let currentScore;
let activePlayer;
let playing;

// function declarations
// starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.remove('hidden');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

// Rolling Dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check if it is 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // add dice to the current score
    } else {
      switchPlayer();
    }
  }
});
// Hold Score Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// implementing new game functionality
btnNew.addEventListener('click', init);
