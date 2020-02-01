/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Add input field .value property (let a player choose winning score)
- Player loses entire score when he rolls 2 6's in a row

- Add second dice to game
*/
var scores, roundScore, activePlayer, gamePlaying, scoreSet, score, previousRoll;
// Initializes game
init();
document.querySelector('.dice-up').style.display = 'none';
document.querySelector('.dice-down').style.display = 'none';

// Allows game to begin once score is set.
document.querySelector('.btn-score').addEventListener('click', function(){
  score = document.getElementById('score-input').value;
  if (score != 0) {
    scoreSet = true;
    document.querySelector('.btn-score').textContent = "You need " + score + " points to win."
  };
})

// Allows you to roll dice

document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying && scoreSet === true) {

    // Get random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // display result of dice up
    var diceDOM1 = document.querySelector('.dice-up');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 +'.png';

    // display result of dice down
    var diceDOM1 = document.querySelector('.dice-down');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice2 +'.png';
    // update round score if number is not 1

    if ((dice1 !== 1 && dice2 !== 1) && (dice1 !== 6 && previousRoll !== 6 || dice1 !== 6 && dice2 !== 6)) {
      // Add Score
      roundScore += (dice1 + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      previousRoll = dice1;

    } else if ((dice1 === 6 && previousRoll === 6) || (dice1 === 6 && dice2 === 6)) {
      console.log(scores[activePlayer]);
      scores[activePlayer] = 0;
      roundScore = 0;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      console.log(scores[activePlayer]);

      previousRoll = 0;
      console.log('You rolled two sixes!');
      nextPlayer();
    } else {
      // Next Player
      previousRoll = 0;
      console.log('You rolled a one');
      nextPlayer();
  }

  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying && scoreSet === true) {
    // add current score to players global score
    scores[activePlayer] += roundScore;
    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // check if player won the game
    if (scores[activePlayer] >= score) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice-up').style.display = 'none';
      document.querySelector('.dice-down').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice-up').style.display = 'none';
  document.querySelector('.dice-down').style.display = 'none';

}

function init(){
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = 'true';
  scoreSet = 'false';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.btn-score').innerHTML = '<input id="score-input" type="number" name="quantity" min="1" max="50000"> Points To Win';



  document.querySelector('.dice').style.display = 'none';





}
