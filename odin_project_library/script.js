// odin project - Library Project

let STATE = [];

const form = document.querySelector("form");
const table = document.querySelector("table");

const listOfBooks = document.querySelector("#library");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const readInput = document.querySelector("#read");
const confirm = document.querySelector("#confirm");

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

// checking to see if there is anything saved in local storage
STATE = getFromLocalStorage() || STATE;

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

function addBook(title, author, read) {
  const book = new Book(title, author, read);
  STATE.push(book);
  saveToLocalStorage(STATE);
}

function deleteBook(index) {
  STATE.splice(index, 1);
  saveToLocalStorage();
}

// -------------------------------------------------------------------------------------
// View

function render() {
  let html = "";
  for (let book of STATE) {
    html += `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.read}</td>
      <td>
        <button id="delete_button">Delete Book</button>
      </td>
    </tr>`;
  }

  listOfBooks.innerHTML = html;
}

// -------------------------------------------------------------------------------------
// Update

// add book
function onFormSubmit(e) {
  e.preventDefault();
  addBook(titleInput.value, authorInput.value, readInput.value);
  titleInput.value = "";
  authorInput.value = "";
  readInput.value = "";

  confirm.innerHTML = "Book Added";
  setTimeout(removeConfirmation, 1000);

  render();
}

function removeConfirmation() {
  confirm.innerHTML = "";
}

// delete book
function onTableClick(e) {
  const deleteBtn = e.target.tagName === "BUTTON";
  const row = e.target.closest("tr");
  //changes the 'tr' Nodelist into an array
  const rows = Array.from(document.querySelectorAll("tbody tr"));
  // finds the index of the row we want to remove
  const index = rows.indexOf(row);

  if (deleteBtn) {
    deleteBook(index);
    render();
  }
}

// -------------------------------------------------------------------------------------
// event listeners

// add book to library
form.addEventListener("submit", onFormSubmit);

// delete book from library
table.addEventListener("click", onTableClick);

// -------------------------------------------------------------------------------------

render();
