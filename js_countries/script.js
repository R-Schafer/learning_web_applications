// -------------------------------------- MODEL -------------------------------------- //
let STATE = {
  countries: JSON.parse(localStorage.getItem("STATE.countries")) || [],
  typedCountry: "",
  dropdownSelection: "",
  individualCountryIndex: -1,
  limit: 12,
};

// --------------------------------------- VIEW --------------------------------------- //

const mainDisplay = document.querySelector(".main-display");
const individualDisplay = document.querySelector(".individual-display");
const individualContainer = document.querySelector(".individual-container");
const form = document.querySelector("form");
const input = document.querySelector(".input");
const dropdown = document.querySelector(".dropdown");
const countryContainer = document.querySelector(".country-container");
const filterRegion = document.querySelectorAll(".filterRegion");
const backBtn = document.querySelector("button");
const setThemeColor = document.querySelector(".material-symbols-outlined");
const spinner = document.querySelector(".spinner");
const footer = document.querySelector("footer");

async function main() {
  filterRegion.forEach((filterRegion) =>
    filterRegion.addEventListener("click", handleRegionSelection)
  );

  window.addEventListener("load", handleSpinner);
  form.addEventListener("submit", handleSubmit);
  input.addEventListener("click", handleSearch);
  input.addEventListener("beforeinput", handleInput);
  dropdown.addEventListener("click", toggleDropdownMotion);
  countryContainer.addEventListener("click", handleClick);
  backBtn.addEventListener("click", handleClick);
  setThemeColor.addEventListener("click", setTheme);

  setTheme();

  // add correct year to footer
  footer.insertAdjacentHTML("beforeend", ` ${new Date().getFullYear()}`);
  await fetchCountries();
}

function handleSpinner() {
  spinner.classList.toggle("off");
}

function handleSearch() {
  if (dropdown.classList.contains("active")) {
    dropdown.classList.remove("active");
  }
}

function handleInput(e) {
  console.log(e);
  let char = e.data;
  const alpha = /^[a-zA-Z ]+$/;
  if (!alpha.test(char)) {
    e.preventDefault();
  }
}

function toggleDropdownMotion(e) {
  e.preventDefault();
  dropdown.classList.toggle("active");
}

function setTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  let preferredTheme;

  if (currentTheme) {
    preferredTheme = currentTheme === "light" ? "dark" : "light";
  } else {
    // onload color scheme based on system preference
    preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.documentElement.setAttribute("data-theme", preferredTheme);
}

function render() {
  let country;

  if (STATE.individualCountryIndex >= 0 || STATE.typedCountry !== "") {
    // if user clicks on a specific country
    if (STATE.individualCountryIndex >= 0) {
      country = STATE.countries[STATE.individualCountryIndex];
      console.log(country);

      // if user types in a specific country
    } else {
      for (let i = 0; i < STATE.countries.length; i++) {
        if (
          STATE.typedCountry === STATE.countries[i].name.common.toLowerCase()
        ) {
          country = STATE.countries[i];
          break;
        }
      }
    }
    // getting border countries if they exist
    const borderCountryNames = [];
    if (country.borders) {
      let borderCountries = country.borders;
      for (let i = 0; i < borderCountries.length; i++) {
        for (let x = 0; x < STATE.countries.length; x++) {
          if (borderCountries[i] === STATE.countries[x].fifa) {
            borderCountryNames.push(STATE.countries[x].name.common);
          }
        }
      }
    } else {
      borderCountryNames.push("No bordering countries");
    }

    individualDisplay.classList.remove("hidden");
    mainDisplay.classList.add("hidden");

    individualContainer.innerHTML = `
      <div class="individual-country">
        <img src="${country.flags.svg}" 
        alt="${country.name.common} flag" />
      </div>
      <div class="individual-country-info">
        <h2>${country.name.common}</h2>
        <div class="individual-country-details"> <span>Official Name:</span> 
        ${country.name.official}</div>
        <div class="individual-country-details"> <span>Population:</span> 
        ${country.population.toLocaleString()}</div>
        <div class="individual-country-details"> <span>Region:</span> 
        ${country.region}</div>
        <div class="individual-country-details"> <span>Sub Region:</span> 
        ${country.subregion}</div>
        <div class="individual-country-details"><span>Capital:</span> 
        ${country.capital[0]}</div>
        <div class="individual-country-details"> <span>Currencies:</span> 
        ${Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", ")}</div>
        <div class="individual-country-details"> <span>Languages:</span> 
        ${Object.values(country.languages).join(", ")}</div>
        <div class="break"></div>
        <h4>Border Countries:</h4>
        <div class="border-countries">${borderCountryNames.join(", ")}</div>
      </div>
    
  `;

    // displaying all countries that correspond with the selected region
  } else {
    countryContainer.innerHTML = "";

    for (let i = 0; i < STATE.limit; i++) {
      country = STATE.countries[i];

      if (STATE.dropdownSelection !== "") {
        if (STATE.dropdownSelection === country.region) {
          countryContainer.innerHTML += `
            <div class="country" data-index=${i}>
              <img src="${country.flags.svg}" 
              alt="${country.name.common} flag" />
              <div class="country-info">
              <h3 class="country-info-details">
              ${country.name.common}</h3>
              <div class="country-info-details"> <span>Population:</span> 
              ${country.population.toLocaleString()}</div>
              <div class="country-info-details"> <span>Region:</span> 
              ${country.region}</div>
              <div class="country-info-details"><span>Capital:</span> 
              ${country.capital[0]}</div>
              </div>
            </div>
          `;
        }
        // displaying the top 12 most populated countries on load
      } else {
        countryContainer.innerHTML += `
          <div class="country" data-index=${i}>
            <img src="${country.flags.svg}"
            alt="${country.name.common} flag" />
            <div class="country-info">
              <h3 class="country-info-details">
              ${country.name.common}</h3>
              <div class="country-info-details"> <span>Population:</span>
              ${country.population.toLocaleString()}</div>
              <div class="country-info-details"> <span>Region:</span>
              ${country.region}</div>
              <div class="country-info-details"><span>Capital:</span>
              ${country.capital[0]}</div>
            </div>
          </div>
        `;
      }
    }
  }
}

// --------------------------------------- UPDATE --------------------------------------- //

function handleSubmit(e) {
  e.preventDefault();
  STATE.typedCountry = input.value.toLowerCase();
  input.value = "";
  STATE.dropdownSelection = "";
  render();
}

function handleRegionSelection(e) {
  e.preventDefault();
  STATE.dropdownSelection = e.target.textContent;
  STATE.typedCountry = "";
  render();
}

function handleClick(e) {
  e.preventDefault();
  // finding the country the user clicked on
  const country = e.target.closest("[data-index]");

  if (e.target === backBtn) {
    STATE.individualCountryIndex = -1;
    individualDisplay.classList.add("hidden");
    mainDisplay.classList.remove("hidden");
  } else if (country) {
    STATE.individualCountryIndex = country.getAttribute("data-index");
    render();
  }
}

async function fetchCountries() {
  if (STATE.countries.length === 0) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    // sorting by largest populations for onload display
    STATE.countries = data.sort((a, b) => b.population - a.population);
    localStorage.setItem("STATE.countries", JSON.stringify(STATE.countries));
  }

  render();
  handleSpinner();

  // setting the countries length to all matching countries after the initial 12
  STATE.limit = STATE.countries.length;
}

main();
