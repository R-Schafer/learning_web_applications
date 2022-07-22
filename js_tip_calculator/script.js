// buttons
const calculate = document.querySelector(".calculate");
const reset = document.querySelector(".reset");
// input
const bill = document.querySelector("#bill");
const people = document.querySelector("#people");
const custom = document.querySelector("#custom-tip");
// calculation display
// totals
const totalBill = document.querySelector(".bill-display");
const totalTip = document.querySelector(".tip-display");
const totalBillTip = document.querySelector(".total-display");
// calculation display
// per person
const personBill = document.querySelector(".person-bill-display");
const personTip = document.querySelector(".person-tip-display");
const personBillTip = document.querySelector(".person-total-display");
// other
const tipPercent = document.querySelectorAll(".percent-amount");

// event handlers
function main() {
  calculate.addEventListener("click", handleCalculateClick);
  reset.addEventListener("click", handleResetClick);

  bill.addEventListener("keydown", isInputNumber);
  people.addEventListener("keydown", isInputNumber);
  custom.addEventListener("keydown", isInputNumber);

  custom.addEventListener("click", removeClickedClass);

  for (let i = 0; i < tipPercent.length; i++) {
    tipPercent[i].addEventListener("click", handleTipClick);
  }
}

function handleCalculateClick(e) {
  e.preventDefault();
  // find out if a tip amount has been clicked
  let selectedTip;
  for (let i = 0; i < tipPercent.length; i++) {
    if (tipPercent[i].classList.contains("clicked")) {
      selectedTip = parseInt(tipPercent[i].innerHTML);
      break;
    }
  }

  if (validate(selectedTip)) {
    if (selectedTip) {
      calcTip(selectedTip);
    } else {
      calcTip(parseInt(custom.value, 10));
    }
  }
}

function calcTip(tipAmount) {
  const billAmount = parseInt(bill.value, 10);
  const numPeople = parseInt(people.value, 10);
  const tipPerPerson = (billAmount * (tipAmount / 100)) / numPeople;

  // totals
  totalBill.innerHTML = `$${billAmount.toFixed(2)}`;
  totalTip.innerHTML = `$${(billAmount * (tipAmount / 100)).toFixed(2)}`;
  totalBillTip.innerHTML = `$${(
    billAmount * (tipAmount / 100) +
    billAmount
  ).toFixed(2)}`;

  // per person
  personBill.innerHTML = `$${(billAmount / numPeople).toFixed(2)}`;
  personTip.innerHTML = `$${tipPerPerson.toFixed(2)}`;
  personBillTip.innerHTML = `$${(billAmount / numPeople + tipPerPerson).toFixed(
    2
  )}`;
}

// add class to selected tip for style purposes
function handleTipClick(e) {
  e.preventDefault();
  removeClickedClass();
  custom.value = "";
  e.target.classList.add("clicked");
}

function removeClickedClass() {
  for (let i = 0; i < tipPercent.length; i++) {
    tipPercent[i].classList.remove("clicked");
  }
}

function handleResetClick(e) {
  e.preventDefault();
  bill.value = "";
  people.value = "";
  custom.value = "";
  totalBill.innerHTML = "";
  totalTip.innerHTML = "";
  totalBillTip.innerHTML = "";
  personBill.innerHTML = "";
  personTip.innerHTML = "";
  personBillTip.innerHTML = "";
  removeClickedClass();
}

// omits letters from input boxes
function isInputNumber(e) {
  if (/^[a-zA-Z-+]$/.test(e.key)) {
    e.preventDefault();
  }
}

// make sure input isn't blank
function validate(selectedTip) {
  const peopleWarning = document.querySelector(".people-warning");
  const billWarning = document.querySelector(".bill-warning");
  const customWarning = document.querySelector(".custom-warning");
  const tipWarning = document.querySelector(".tip-warning");

  if (bill.value === "" || parseInt(bill.value, 10) < 1) {
    billWarning.innerHTML = "Enter bill amount";
    setTimeout(() => (billWarning.innerHTML = ""), 3000);
    return false;
  }
  if (people.value === "" || parseInt(people.value, 10) < 1) {
    peopleWarning.innerHTML = "Enter amount of people";
    setTimeout(() => (peopleWarning.innerHTML = ""), 3000);
    return false;
  }
  if (custom.value !== "" && parseInt(custom.value, 10) < 0) {
    customWarning.innerHTML = "Must be a positive number";
    setTimeout(() => (customWarning.innerHTML = ""), 3000);
    return false;
  }
  if (custom.value === "" && !selectedTip) {
    tipWarning.innerHTML = "Choose tip amount";
    setTimeout(() => (tipWarning.innerHTML = ""), 3000);
    return false;
  }

  return true;
}

main();
