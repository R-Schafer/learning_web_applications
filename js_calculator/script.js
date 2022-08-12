const display = document.querySelector(".display");
const keys = document.querySelectorAll(".keys");
let STATE = ["", "", ""];

function main() {
  keys.forEach((key) => key.addEventListener("click", handleKeyClick));
}

function handleKeyClick(e) {
  e.preventDefault();

  if (parseInt(e.target.innerHTML, 10) < 10 || e.target.innerHTML === ".") {
    // for clearing the display right before user puts in 2nd number
    if (STATE[1] !== "" && STATE[2] === "") {
      display.innerHTML = "";
    }
    display.innerHTML += e.target.innerHTML;
    updateState(display.innerHTML);
  }

  if (e.target.innerHTML === "C") {
    updateState("clear");
  }

  if (e.target.innerHTML === "⏎") {
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

  if (e.target.innerHTML === "+/-") {
    updateState("neg");
  }

  if (e.target.innerHTML === "=") {
    updateState("equals");
  }
}

function updateState(value) {
  // operator
  if (STATE[0] !== "") {
    if (value === "add") {
      if (STATE[1] !== "" && STATE[2] !== "") {
        calc();
      }
      STATE[1] = "+";
    }
    if (value === "sub") {
      if (STATE[1] !== "" && STATE[2] !== "") {
        calc();
      }
      STATE[1] = "-";
    }
    if (value === "mul") {
      if (STATE[1] !== "" && STATE[2] !== "") {
        calc();
      }
      STATE[1] = "*";
    }
    if (value === "div") {
      if (STATE[1] !== "" && STATE[2] !== "") {
        calc();
      }
      STATE[1] = "/";
    }
  }
  // number or decimal
  if (/^[+-]?[0-9]*\.?[0-9]*$/.test(value)) {
    if (STATE[1] === "") {
      STATE[0] = value;
    } else {
      STATE[2] = value;
    }
  }

  // clear
  if (value === "clear") {
    STATE = ["", "", ""];
  }

  // backspace
  if (value === "del") {
    if (STATE[1] === "") {
      STATE[0] = display.innerHTML.slice(0, -1);
    } else {
      STATE[2] = display.innerHTML.slice(0, -1);
    }
  }

  // negative or positive
  if (value === "neg") {
    if (STATE[1] === "") {
      STATE[0] = STATE[0] * -1;
    } else {
      STATE[2] = STATE[2] * -1;
    }
  }

  // equals
  if (value === "equals") {
    calc();
  }

  render();
}

function calc() {
  // add
  if (STATE[1] === "+") {
    STATE = [(parseFloat(STATE[0]) + parseFloat(STATE[2])).toString(), "", ""];
  }
  // subtract
  if (STATE[1] === "-") {
    STATE = [(parseFloat(STATE[0]) - parseFloat(STATE[2])).toString(), "", ""];
  }
  // multiply
  if (STATE[1] === "*") {
    STATE = [(parseFloat(STATE[0]) * parseFloat(STATE[2])).toString(), "", ""];
  }
  // divide
  if (STATE[1] === "/") {
    STATE = [(parseFloat(STATE[0]) / parseFloat(STATE[2])).toString(), "", ""];
  }
}

function render() {
  if (STATE[1] === "" || STATE[2] === "") {
    display.innerHTML = STATE[0];
  } else {
    display.innerHTML = STATE[2];
  }
}

main();
