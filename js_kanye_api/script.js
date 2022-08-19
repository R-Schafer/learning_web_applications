const button = document.querySelector("button");
const quote = document.querySelector("span");

function main() {
  fetchKanye();
  button.addEventListener("click", handleClick);
}

function fetchKanye() {
  fetch("https://api.kanye.rest")
    .then((res) => res.json())
    .then((data) => (quote.textContent = `"${data.quote}"`));
}

function handleClick(e) {
  e.preventDefault();
  fetchKanye();
}

main();
