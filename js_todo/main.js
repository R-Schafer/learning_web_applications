const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const textBox = document.getElementById('item');


// form submit event
form.addEventListener('submit', addItem);

// add item function
function addItem(e) {
    e.preventDefault();

    // get input value
    const newItem = textBox.value.trim();
    textBox.value = '';

    if (newItem === '') {
        return;
    }

    // create new li element
    const li = document.createElement('li');
    // add class name
    li.className = 'd-flex justify-content-between align-items-center';


    // create input and checkmark section
    const listItem = document.createElement('div');
    // add class name
    listItem.className = 'form-check flex-grow-1';


    // create checkbox
    const checkBox = document.createElement('input');
    // add class name
    checkBox.className = 'form-check-input';
    // add type
    checkBox.type = 'checkbox';

    // add text input
    const label = document.createElement('label');
    //  add class name
    label.className = 'form-check-label';
    // add text input to label
    label.appendChild(document.createTextNode(newItem));

    // add checkbox to list item
    listItem.appendChild(checkBox);
    // add label to list item
    listItem.appendChild(label);
    // add div to li
    li.appendChild(listItem);


    // creating the altering sections - Edit and Delete
    const alterItem = document.createElement('div');
    // not sure if i need below
    // add class name
    alterItem.className = 'alterItem';
    

    // create edit button
    const editBtn = document.createElement('button');
    // add class name
    editBtn.className = 'btn btn-link';
    // add type
    editBtn.type = 'button';

    // create edit button image
    const pencil = document.createElement('i');
    // add class name
    pencil.className = 'bi bi-pencil-fill';

    // add pencil image to edit button
    editBtn.appendChild(pencil);


    // create delete button element
    const deleteBtn = document.createElement('button');
    // add classes to delete button
    deleteBtn.className = 'btn btn-link link-dark pe-0';
    // add type
    deleteBtn.type = 'button';

    // create delete button image
    const trashcan = document.createElement('i');
    // add class name
    trashcan.className = 'bi bi-trash-fill';

    // add trashcan image to delete button
    deleteBtn.appendChild(trashcan);
    

    // add edit button to altering section
    alterItem.appendChild(editBtn);

    // add delete button to altering section
    alterItem.appendChild(deleteBtn);

    // add to list item
    li.appendChild(listItem);

    // add altering section to list item
    li.appendChild(alterItem);

    // add li to list
    itemList.appendChild(li);


    // event listeners
    // checkbox event listener
    checkBox.addEventListener('change', completeItem);
    // edit event listener
    editBtn.addEventListener('click', editItem);
    // delete button event listener
    deleteBtn.addEventListener('click', deleteItem);

}


// checkbox function
function completeItem(e) {
    // gray out
    const checkBox = e.currentTarget;
    const label = checkBox.nextElementSibling;
    label.classList.toggle('text-black-50');

    // disabling edit button 
    // locating edit button
    const editBtn = label.closest('li').querySelector('button');
    // turning edit button off when checkbox clicked
    editBtn.disabled = !editBtn.disabled;
}

// edit function
function editItem(e) {
    e.stopPropagation();
    
    const editBtn = e.currentTarget;

    // disabling edit button 
    editBtn.disabled = true;

    // grabbing the label
    const label = editBtn.closest('li').querySelector('label');

    // create an input element
    const textBox = document.createElement('input');
    // add type
    textBox.type = 'text';
    // add id
    textBox.id = 'editing';
    // add class
    textBox.className = 'form-control p-0 border-0';
    // add value
    textBox.value = label.textContent;

    // placing the text box within div
    label.parentElement.appendChild(textBox);

    // remove original label
    label.remove();

    // put focus on the text box
    textBox.focus();

    // event listeners
    // keyup event
    textBox.addEventListener('keyup', finishEdit);

    // clicking anywhere outside of box
    document.addEventListener('click', finishEdit);
}

// edit button functions
function finishEdit(e) {
    if ((e.type === 'keyup' && e.code === 'Enter') || e.target.id !== 'editing') {
        document.removeEventListener('click', finishEdit);

        const textBox = document.getElementById('editing');

        // create a label element
        const label = document.createElement('label');
        // add class
        label.className = 'form-check-label';
        // add value
        label.textContent = textBox.value; 

        // placing the label within div
        textBox.parentElement.appendChild(label);

        // remove text box
        textBox.remove();

        // finding edit button
        const editBtn = label.closest('li').querySelector('button[disabled]');
        // undisable edit button
        editBtn.disabled = false;
    }
}


// delete function
function deleteItem(e) {
    // remove listener so it doesn't try to edit after its been deleted
    document.removeEventListener('click', finishEdit);

    const deleteBtn = e.currentTarget;
    deleteBtn.parentElement.parentElement.remove();
}
