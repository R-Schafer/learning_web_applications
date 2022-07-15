// main game
const images = [...document.querySelectorAll(".images")];
const imagesContainer = document.querySelector(".images-container");
const score = document.querySelector(".score");
const bestScore = document.querySelector(".best-score");
// end screen
const button = document.querySelector("#end-message button");
const endScreen = document.getElementById("end-message");
const endGameMessage = document.querySelector("#end-message h2");

function main() {
  // add event listener on all images
  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", onImageClick);
  }

  // event listener on end screen
  button.addEventListener("click", removeEndScreen);
}

function removeEndScreen(e) {
  e.preventDefault();
  endScreen.hidden = true;
  endGameMessage.textContent = "";
}

function onImageClick(e) {
  e.preventDefault();
  e.currentTarget.classList.toggle("clicked");
  // remove images from the dom
  for (let i = 0; i < images.length; i++) {
    images[i].remove();
  }
  // shuffle images
  images.sort(() => 0.5 - Math.random());
  // put images back into the dom
  for (let i = 0; i < images.length; i++) {
    imagesContainer.append(images[i]);
  }

  keepScore(e.currentTarget);
}

// keeping score & best score
function keepScore(image) {
  if (image.classList.contains("clicked")) {
    score.textContent = `${parseInt(score.textContent, 10) + 1}`;
    // check to see if player won
    if (checkWin()) {
      endGame(images.length);
    }
  } else {
    endGame(parseInt(score.textContent, 10));
  }
}

// see if player has clicked all images
function checkWin() {
  let win = true;
  for (let i = 0; i < images.length; i++) {
    if (!images[i].classList.contains("clicked")) {
      win = false;
    }
  }
  return win;
}

// end game
function endGame(correctImgGuesses) {
  score.textContent = 0;

  // end of game screen
  if (correctImgGuesses === images.length) {
    endScreen.hidden = false;
    endGameMessage.textContent = `You got all ${correctImgGuesses}, way to go!`;
  } else if (correctImgGuesses > 1) {
    endScreen.hidden = false;
    endGameMessage.textContent = `Game over, you got ${correctImgGuesses} images in a row!`;
  } else {
    endScreen.hidden = false;
    endGameMessage.textContent = `Game over, you only got ${correctImgGuesses}!`;
  }

  // remove "clicked" class from all images
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove("clicked");
  }

  //   set best score
  if (correctImgGuesses > parseInt(bestScore.textContent, 10)) {
    bestScore.textContent = correctImgGuesses;
  }
}

main();
