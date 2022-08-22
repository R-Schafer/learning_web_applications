const spinner = document.querySelector(".spinner");
const button = document.querySelector("button");
const audio = document.querySelector("audio");
const img = document.querySelector("img");

function main() {
  window.addEventListener("load", handleSpinner);
  button.addEventListener("click", handleButtonClick);
  fetchWow();
}

function handleSpinner() {
  spinner.classList.remove("spinning");
  img.hidden = false;
}

function fetchWow() {
  fetch("https://owen-wilson-wow-api.herokuapp.com/wows/random")
    .then((res) => res.json())
    .then((data) => (audio.src = data[0].audio));
}

function handleButtonClick(e) {
  e.preventDefault();
  fetchWow();
}

main();
