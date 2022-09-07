// const officialName = document.querySelector(".official_name");
const mainDisplay = document.querySelector(".main-display");
const individualDisplay = document.querySelector(".individual-display");
const individualContainer = document.querySelector(".individual-container");
const img = document.querySelector("img");
const commonName = document.querySelector(".name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const capital = document.querySelector(".capital");
const dropdown = document.querySelector(".dropdown");
const countryContainer = document.querySelector(".country-container");
const filterRegion = document.querySelectorAll(".filterRegion");
const button = document.querySelector("button");

let STATE = [];

async function main() {
  filterRegion.forEach((filterRegion) =>
    filterRegion.addEventListener("click", selectRegion)
  );

  dropdown.addEventListener("click", filterBetweenRegions);
  // countryContainer.addEventListener("click", toggleHiddenClass);
  // button.addEventListener("click", toggleHiddenClass);

  await fetchCountries();
  render();
}

function filterBetweenRegions(e) {
  e.preventDefault();
  dropdown.classList.toggle("active");
  const selectedRegion = selectRegion(e);
  document.querySelector(".textBox").value = selectedRegion;
}

function selectRegion(e) {
  e.preventDefault();
  return e.target.textContent;
}

function toggleHiddenClass(e) {
  e.preventDefault();
  mainDisplay.classList.toggle("hidden");
  individualDisplay.classList.toggle("hidden");

  if (mainDisplay.classList.contains("hidden")) {
    individualRender(e.currentTarget.firstElementChild);
  }
}

async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  STATE = data;

  // sorting by largest populations for initial display
  STATE.sort((a, b) => b.population - a.population);
}

// function individualRender(e) {
//   console.log(e);
//   individualContainer.innerHTML = `
//   <div class="country">
//     <img src="${e.firstElementChild}" alt="" />
//       <div class="country-info">
//         <div class="name">${e}</div>
//         <div class="population"> Population: ${e}</div>
//         <div class="region"> Region: ${e}</div>
//         <div class="capital">Capital: ${e}</div>
//       </div>
//     </div>
//   `;
// }

function render() {
  countryContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    countryContainer.innerHTML += `
    <div class="country" data-index=${i}>
      <img src="${STATE[i].flags.svg}" alt="" />
        <div class="country-info">
          <div class="name">${STATE[i].name.common}</div>
          <div class="population"> Population: ${STATE[i].population}</div>
          <div class="region"> Region: ${STATE[i].region}</div>
          <div class="capital">Capital: ${STATE[i].capital[0]}</div>
        </div>
    </div>
    `;
  }
}

main();
