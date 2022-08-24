const title = document.querySelector(".title");
const date = document.querySelector("#date");
const img = document.querySelector("#picture_of_day");
const description = document.querySelector(".description");

function main() {
  // prohibits user from clicking future date
  date.max = new Date().toISOString().split("T")[0];
  // listens for the date to change
  date.addEventListener("change", gatherInfo);

  gatherInfo();
}

async function gatherInfo() {
  const archived = date.value;
  const data = await fetchNASA(archived);
  render(data);
}

async function fetchNASA(archived) {
  const response = await fetch(`/nasa/planetary/apod?date=${archived}`);
  if (!response.ok) {
    throw new Error("failed to fetch");
  }
  return response.json();
}

function render(data) {
  title.textContent = data.title;
  img.src = data.url;
  img.alt = data.title;
  description.textContent = data.explanation;
}

main();
