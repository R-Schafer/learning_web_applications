const elements = {
  get form() {
    return document.querySelector("form");
  },
  get measurement() {
    return document.getElementById("measurement");
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
    const percentOfGold = elements.carat.value / 24;
    const price = elements.price.value;
    const weight = elements.weight.value;

    if (elements.measurement.value === "Grams") {
      const grams = ((percentOfGold * price) / 31.1) * weight;

      elements.value.innerHTML = `Value = $${grams.toFixed(2)}`;
    } else {
      const ounces = percentOfGold * price * weight;
      elements.value.innerHTML = `Value = $${ounces.toFixed(2)}`;
    }
  } else {
    alert(
      "Must use numbers only! If using a decimal, please make sure there is a zero in front."
    );
  }
}

document.addEventListener("DOMContentLoaded", main);
