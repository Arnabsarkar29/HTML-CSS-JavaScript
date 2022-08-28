const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
console.log(secretNumber);
// game logic check button
document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  if (score >= 1) {
    // there is no number
    if (!guess) {
      displayMessage('👿 No number');
    }
    // guess is correct
    else if (guess === secretNumber) {
      displayMessage('🎉 Correct Number');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    }
    // guess is too high
    else if (guess > secretNumber) {
      document.querySelector('.message').textContent = '📈 Too high';
      score--;
    }
    // guess is too low
    else if (guess < secretNumber) {
      document.querySelector('.message').textContent = '📉 Too low';
      score--;
    }
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.score').textContent = 0;
    displayMessage('😢 You lost');
    document.querySelector('body').style.backgroundColor = '#f03e3e';
  }
});

// again button
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start Guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
});
