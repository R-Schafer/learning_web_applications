let STATE = [];

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const main = document.querySelector("main");

const getFromLocalStorage = () => {
  // returning the json string and turning back into object
  return JSON.parse(localStorage.getItem("STATE"));
};

// save item to local storage
const saveToLocalStorage = () => {
  // local storage only takes stings so use json to convert
  localStorage.setItem("STATE", JSON.stringify(STATE));
};

// -------------------------------------------------------------------------------------
// Model

// looking to see if there is anything saved, if not, show empty
STATE = getFromLocalStorage() || STATE;

const addItem = (name) => {
  // prohibiting a blank input isn't added to list
  if (name.trim() !== "") {
    STATE.push({ name: name.trim(), done: false, editing: false });
    return true;
  }
  return false;
};

const deleteItem = (index) => {
  STATE.splice(index, 1);
};

const completeItem = (index) => {
  STATE[index].done = !STATE[index].done;
};

const startEditItem = (index) => {
  STATE[index].editing = true;
};

const finishEditItem = (index, name) => {
  if (name.trim() !== "") {
    STATE[index].name = name.trim();
    STATE[index].editing = false;
  } else {
    deleteItem(index);
  }
};

// -------------------------------------------------------------------------------------
// View

// renders the whole page
const render = () => {
  main.innerHTML = Main(STATE);
};

// rendering the list
const Main = (state) => {
  return `
    <div id="content-container">
      <ul>
        ${state.map((item) => Todo(item)).join("")}
       </ul>
    </div>
  `;
};

// rendering item
const Todo = (item) => {
  if (item.editing) {
    return `
      <li>
        <input class="item" type="checkbox" ${item.done ? "checked" : ""} />
        <input class="item-edit" type="text" value="${item.name}" />
        <button type="button">X</button>
      </li>
    `;
  }

  return `
    <li>
      <input class="item" type="checkbox" ${item.done ? "checked" : ""} />
      <span class="item-name">${item.name}</span>
      <button type="button">X</button>
    </li>
  `;
};

// -------------------------------------------------------------------------------------
// Update

// adding item to the state
const onFormSubmit = (e) => {
  e.preventDefault();

  let added = addItem(input.value);
  if (added) {
    saveToLocalStorage(STATE);
    render();
  }
  // clearing the input after "enter"
  input.value = "";
};

// complete, delete, start edit, and finish edit
const onDocumentClick = (e) => {
  // turning the ul into an array
  const listOfItems = Array.from(main.querySelector("ul").children);

  // finish edit - runs to finalize any in progress edits
  for (let i = 0; i < listOfItems.length; i++) {
    let input = listOfItems[i].querySelector(".item-edit");

    // if there is an in progress edit and the user clicks out of it, we save the current text
    if (input && e.target !== input) {
      finishEditItem(i, input.value);
      // save
      saveToLocalStorage();
      render();
    }
  }

  // fnding the li
  const listItem = e.target.closest("li");
  if (!listItem) {
    return;
  }

  // finding the index
  const index = listOfItems.indexOf(listItem);

  // delete
  if (e.target.tagName === "BUTTON") {
    deleteItem(index);
    // save
    saveToLocalStorage();
    render();
  }

  // complete
  if (e.target.type === "checkbox") {
    completeItem(index);
    // save
    saveToLocalStorage();
    render();
  }

  // start edit
  if (e.target.classList.contains("item-name")) {
    startEditItem(index);
    // save
    saveToLocalStorage();
    render();

    // focusing cursor on editing
    const input = main.querySelector(".item-edit");
    input.focus();
    input.setSelectionRange(-1, -1);
  }
};

// saving edit with enter
const onMainKeyup = (e) => {
  if (e.code === "Enter") {
    // finding the li
    const listItem = e.target.closest("li");
    // turning the ul into an array
    const listOfItems = Array.from(main.querySelector("ul").children);
    // finding the index
    const index = listOfItems.indexOf(listItem);

    finishEditItem(index, e.target.value);

    // save
    saveToLocalStorage();
    render();
  }
};

// -------------------------------------------------------------------------------------
// event listeners

// add item to list
form.addEventListener("submit", onFormSubmit);

// checking for delete click, complete click, or edit click
document.addEventListener("click", onDocumentClick);

// finalize editing - enter
main.addEventListener("keyup", onMainKeyup, true);

// -------------------------------------------------------------------------------------

render();
