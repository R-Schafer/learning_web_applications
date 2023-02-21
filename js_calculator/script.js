const display = document.querySelector(".display");
const keys = document.querySelectorAll(".keys");
const footer = document.querySelector("footer");

let STATE = ["", "", ""];

function main() {
  keys.forEach((key) => key.addEventListener("click", handleKeyClick));
}

function handleKeyClick(e) {
  e.preventDefault();

  if (parseInt(e.target.textContent, 10) < 10 || e.target.textContent === ".") {
    // for clearing the display right before user puts in 2nd number
    if (STATE[1] !== "" && STATE[2] === "") {
      display.textContent = "";
    }
    display.textContent += e.target.textContent;
    updateState(display.textContent);
  }

  if (e.target.textContent === "C") {
    updateState("clear");
  }

  if (e.target.textContent === "⏎") {
    updateState("del");
  }

  if (e.target.textContent === "+") {
    updateState("add");
  }

  if (e.target.textContent === "-") {
    updateState("sub");
  }

  if (e.target.textContent === "×") {
    updateState("mul");
  }

  if (e.target.textContent === "÷") {
    updateState("div");
  }

  if (e.target.textContent === "+/-") {
    updateState("neg");
  }

  if (e.target.textContent === "=") {
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
      STATE[0] = display.textContent.slice(0, -1);
    } else {
      STATE[2] = display.textContent.slice(0, -1);
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
    display.textContent = STATE[0];
  } else {
    display.textContent = STATE[2];
  }
}

// add correct year to footer
footer.insertAdjacentHTML("beforeend", ` ${new Date().getFullYear()}`);

main();
