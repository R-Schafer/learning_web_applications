const input = document.querySelector("#display");
const keys = document.querySelectorAll(".keys");
const equals = document.querySelector("#equals");
let STATE = 0;

function main() {
  keys.forEach((key) => key.addEventListener("click", handleKeyClick));

  equals.addEventListener("click", handleEquals);
}

function handleKeyClick(e) {
  e.preventDefault();
  if (e.target.innerHTML < 10) {
    input.value += e.target.innerHTML;
    updateState(parseInt(input.value, 10));
  }
  if (e.target.innerHTML === "C") {
    updateState(e.target.innerHTML);
  }
  if (e.target.innerHTML === "⌫") {
    updateState("del");
  }
}

function updateState(value) {
  if (STATE >= 0) {
    STATE = value;
  }
  if (value === "C") {
    STATE = 0;
  }
  if (value === "del") {
    STATE = input.value.slice(0, -1);
  }
  input.value = STATE;
}

function handleEquals() {
  input.value = 80085;
}

main();
