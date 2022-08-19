const button = document.querySelector("button");
const idea = document.querySelector("span");

function main() {
  button.addEventListener("click", handleClick);
}

function fetchIdea() {
  fetch("http://www.boredapi.com/api/activity/")
    .then((res) => res.json())
    .then((data) => (idea.textContent = data.activity));
}

function handleClick(e) {
  e.preventDefault();
  fetchIdea();
}

main();
