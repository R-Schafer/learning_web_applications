const input = document.querySelector("#display");
const keys = document.querySelectorAll(".keys");
let STATE = [0, 0, ""];

function main() {
  keys.forEach((key) => key.addEventListener("click", handleKeyClick));
}

function handleKeyClick(e) {
  e.preventDefault();
  if (parseInt(e.target.innerHTML, 10) < 10) {
    if (STATE[2] !== "" && STATE[1] === 0) {
      input.value = "";
    }
    input.value += e.target.innerHTML;
    updateState(parseInt(input.value, 10));
  }
  if (e.target.innerHTML === "C") {
    updateState("clear");
  }
  if (e.target.innerHTML === "⌫") {
    updateState("del");
  }
  if (e.target.innerHTML === "+") {
    updateState("add");
  }
  if (e.target.innerHTML === "-") {
    updateState("sub");
  }
  if (e.target.innerHTML === "×") {
    updateState("mul");
  }
  if (e.target.innerHTML === "÷") {
    updateState("div");
  }
  if (e.target.innerHTML === ".") {
    updateState("dec");
  }
  if (e.target.innerHTML === "+/-") {
    updateState("neg");
  }
  if (e.target.innerHTML === "=") {
    updateState("equals");
  }
  console.log(STATE);
}

function updateState(value) {
  if (value === "add") {
    if (STATE[2] !== "") {
      calc();
    }
    STATE[2] = "+";
  }
  if (value === "sub") {
    if (STATE[2] !== "") {
      calc();
    }
    STATE[2] = "-";
  }
  if (value === "mul") {
    if (STATE[2] !== "") {
      calc();
    }
    STATE[2] = "*";
  }
  if (value === "div") {
    if (STATE[2] !== "") {
      calc();
    }
    STATE[2] = "/";
  }
  if (typeof value === "number") {
    if (STATE[2] === "") {
      STATE[0] = value;
    } else {
      STATE[1] = value;
    }
  }
  if (value === "clear") {
    STATE = [0, 0, ""];
  }
  // if (value === "del") {
  //   STATE = input.value.slice(0, -1);
  //   if (STATE.length === 0) {
  //     STATE = 0;
  //   }
  // }

  // if (value === "dec") {
  //   STATE[0] * STATE[1];
  // }
  // if (value === "neg") {

  // }

  if (value === "equals") {
    calc();
  }

  render();
}

function calc() {
  if (STATE[2] === "+") {
    STATE = [STATE[0] + STATE[1], 0, ""];
  }
  // subtract
  if (STATE[2] === "-") {
    STATE = [STATE[0] - STATE[1], 0, ""];
  }
  // multiply
  if (STATE[2] === "*") {
    STATE = [STATE[0] * STATE[1], 0, ""];
  }
  // divide
  if (STATE[2] === "/") {
    STATE = [STATE[0] / STATE[1], 0, ""];
  }
}

function render() {
  if (STATE[2] === "" || STATE[1] === 0) {
    input.value = STATE[0];
  } else {
    input.value = STATE[1];
  }
}

function handleEquals() {
  render();
}

main();
