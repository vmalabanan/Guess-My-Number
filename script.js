'use strict';

// Function to generate a random number between 1 and 20
const randomNumber = () => Math.trunc(Math.random() * 20) + 1;

// Function to set text content of an element
const setTextContent = (element, text) =>
  (document.querySelector(element).textContent = text);

// Function to display message (set text content of message element)
const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

// Function to set value of an element
const setValue = (element, value) =>
  (document.querySelector(element).value = value);

// Function to set background color of an element
const setBackgroundColor = (element, value) =>
  (document.querySelector(element).style.backgroundColor = value);

// Function to set width of an element
const setWidth = (element, value) =>
  (document.querySelector(element).style.width = value);

// Declaring variables
let num = randomNumber();

// console.log(num); // Remove -- for testing only!

// Do I really need to cast score and highScore as numbers? Will work either way
let score = Number(document.querySelector('.score').textContent); // 20 (start)
const startScore = score;
let highScore = Number(document.querySelector('.highscore').textContent); // 0 (start)

const startMessage = 'Start guessing...';
const tooLowMessage = '📉 Too low!';
const tooHighMessage = '📈 Too high!';
const notInRangeMessage = '⛔ Please choose a number between 1 and 20';
const loseMessage = '💥 You lost :(';
const winMessage = '🏆 You win! :)';
const noNumberMessage = '⛔ No number entered';
let win = false;
let lose = false;
const hiddenNumber = '?';

// EVENT LISTENERS
// Check button
document.querySelector('.check').addEventListener('click', function () {
  // Declare/initialize guess variable
  const guess = Number(document.querySelector('.guess').value);

  // If player has already won or lost the game, return
  if (win || lose) return;
  // If guess < 1 or > 20, display error message and return
  else if (guess < 1 || guess > 20) {
    displayMessage(notInRangeMessage);
    return;
  }

  // If there is no input in the text box, display error message and return
  else if (!guess) {
    displayMessage(noNumberMessage);
    return;
  }

  // If guess is incorrect
  else if (guess !== num) {
    // Decrement score variable
    setTextContent('.score', --score);

    // If score reaches 0
    if (score <= 0) {
      // Set lose = true
      lose = true;

      // Display lose message
      displayMessage(loseMessage);

      // Display hidden number
      setTextContent('.number', num);

      // Expand width of the number box
      // document.querySelector('.number').style.width = '30rem';
      setWidth('.number', '30rem');

      return;
    }

    // If guess is too high, display too high message. Else display too low message.
    displayMessage(guess > num ? tooHighMessage : tooLowMessage);
  }

  // If guess is correct
  else {
    // Set win = true;
    win = true;

    // Display win message
    displayMessage(winMessage);

    // Display hidden number
    setTextContent('.number', num);

    // Save high score if score > high score
    if (score > highScore) {
      highScore = Number(setTextContent('.highscore', score)); // Do I really need to cast highScore as a number? Works either way
    }

    // Change background to green (#60b347);
    // document.querySelector('body').style.backgroundColor = '#60b347';
    setBackgroundColor('body', '#60b347');

    // Expand width of the number box
    // document.querySelector('.number').style.width = '30rem';
    setWidth('.number', '30rem');
  }
});

// Again button
document.querySelector('.again').addEventListener('click', function () {
  // Reset win and lose variables
  win = false;
  lose = false;

  // Reset value in box to ?
  setTextContent('.number', hiddenNumber);

  // Generate a new random number
  num = randomNumber();

  // console.log(num); // Remove -- for testing only!

  // Reset message to starting message
  displayMessage(startMessage);

  // Reset score to starting score
  score = setTextContent('.score', startScore);

  // Clear text entry box
  setValue('.guess', '');

  // Reset background color to #222
  // document.querySelector('body').style.backgroundColor = '#222';
  setBackgroundColor('body', '#222');

  // Reset size of number box
  // document.querySelector('.number').style.width = '15rem';
  setWidth('.number', '15rem');
});
