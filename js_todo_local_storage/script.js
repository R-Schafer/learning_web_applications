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
  return `
    <li>
      <input class="item" type="checkbox" ${item.done ? "checked" : ""} />
      <span>${item.name}</span>
      <button type="button">X</button>
    </li>
  `;
};

// -------------------------------------------------------------------------------------
// Update

// checking for delete click or complete click
const completeOrDeleteItem = (e) => {
  if (e.target.tagName == "INPUT") {
    const checkBox = e.target;
    const listItem = checkBox.closest("li");

    // make an array out of the list children
    // getting the li's
    const listOfItems = Array.from(listItem.closest("ul").children);
    // finding the index
    const index = listOfItems.indexOf(listItem);
    // changing the status of done to the opposite
    STATE[index].done = !STATE[index].done;
    // save
    saveToLocalStorage();

    render();
  }

  if (e.target.tagName == "BUTTON") {
    const deleteBtn = e.target;
    const listItem = deleteBtn.closest("li");

    // make an array out of the list children
    // getting the li's
    const listOfItems = Array.from(listItem.closest("ul").children);
    // finding the index
    const index = listOfItems.indexOf(listItem);
    // remove item from list
    STATE.splice(index, 1);
    // save
    saveToLocalStorage();

    render();
  }
};

// adding item to the state
const addItem = (e) => {
  e.preventDefault();

  // prohibiting a blank input isn't added to list
  if (input.value.trim() !== "") {
    STATE.push({ name: input.value.trim(), done: false });
    saveToLocalStorage(STATE);
    render();
  }
  // clearing the input after "enter"
  input.value = "";
};

// -------------------------------------------------------------------------------------
// event listeners

// add item to list
form.addEventListener("submit", addItem);

// checking for delete click or complete click
main.addEventListener("click", completeOrDeleteItem);
// -------------------------------------------------------------------------------------

render();
