const elements = {
  get form() {
    return document.querySelector("form");
  },
  get carat() {
    return document.getElementById("carat");
  },
  get weight() {
    return document.getElementById("weight");
  },
  get price() {
    return document.getElementById("price");
  },
  get value() {
    return document.getElementById("value");
  },
  get footer() {
    return document.querySelector("footer");
  },
};

function main() {
  elements.form.addEventListener("submit", calculateWorth);
  elements.footer.insertAdjacentHTML(
    "beforeend",
    ` ${new Date().getFullYear()}`
  );
}

function calculateWorth(e) {
  e.preventDefault();
  if (
    elements.carat.value.match(/^\d+(\.\d+)?$/) &&
    elements.weight.value.match(/^\d+(\.\d+)?$/) &&
    elements.price.value.match(/^\d+(\.\d+)?$/)
  ) {
    const worth = (
      Math.round(
        (((1 / 24) *
          elements.carat.value *
          elements.weight.value *
          elements.price.value) /
          31.1) *
          100
      ) / 100
    ).toFixed(2);
    elements.value.innerHTML = `Value = $${worth}`;
  } else {
    alert("Must use numbers only!");
  }
}

document.addEventListener("DOMContentLoaded", main);
