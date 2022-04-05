import { FetchWrapper } from "./fetch-wrapper.js";

const base = document.querySelector("#base-currency");
const target = document.querySelector("#target-currency");
const result = document.querySelector("#conversion-result");

// redirect through netlify with /currency rather than API key
const API = new FetchWrapper("/currency");

// fetching the latest conversion rates
const getConversionRates = () => {
  API.get(`/latest/${base.value}`).then((data) => {
    result.textContent = data.conversion_rates[target.value];
  });
};

base.addEventListener("change", () => {
  getConversionRates();
});
target.addEventListener("change", () => {
  getConversionRates();
});

// fetching currency codes and inserting in the select elements
API.get(`/codes`).then((data) => {
  data.supported_codes.forEach((code) => {
    base.insertAdjacentHTML(
      "beforeend",
      // using ternary to make default USD
      `<option value = "${code[0]}" ${code[0] === "USD" ? "selected" : ""}>${
        code[1]
      }</option>`
    );

    target.insertAdjacentHTML(
      "beforeend",
      // using ternary to make default USD
      `<option value = "${code[0]}" ${code[0] === "USD" ? "selected" : ""}>${
        code[1]
      }</option>`
    );
  });
});
