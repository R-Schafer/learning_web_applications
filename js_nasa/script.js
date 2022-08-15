const title = document.querySelector(".title");
const img = document.querySelector("img");
const credit = document.querySelector(".img_credit");
const description = document.querySelector(".description");

async function fetchNASA() {
  const response = await fetch(`/nasa/planetary/apod`);
  return response.json();
}

async function start() {
  const data = await fetchNASA();
  render(data);
}

function render(data) {
  title.textContent = data.title;
  img.src = data.url;
  description.textContent = data.explanation;
  credit.textContent = `Image Credit & Copright: ${data.copyright}`;
  console.log(data);
}

start();
