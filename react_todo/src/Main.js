import React, { useState } from "react";

// tried to write in 2 ways

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>✓</button>
        <button onClick={() => removeTodo(index)}>𝗫</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add Todo..."
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Main() {
  const [todos, setTodos] = useState([]);

  // add todo
  function addTodo(text) {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  }

  // complete todo
  function completeTodo(index) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  // remove todo
  function removeTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="main">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default Main;

// also can write it like below

// // function Main() {
//   // state for list of todos
//   const [todoList, setTodoList] = useState([]);
//   // state for each new todo
//   const [newTodo, setNewTodo] = useState("");

//   // add new todo
//   function handleSubmit(event) {
//     event.preventDefault();
//     if (newTodo === "") return;
//     setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
//     setNewTodo("");
//   }

//   // delete todo
//   function handleDeleteClick(event) {
//     // find index
//     const index = parseInt(event.target.closest("div").dataset.index, 10);
//     // remove index
//     setTodoList((prevTodoList) => [
//       ...prevTodoList.slice(0, index),
//       ...prevTodoList.slice(index + 1),
//     ]);
//   }

//   // complete todo
//   function handleCompleteClick(event) {
//     // find index
//     const index = parseInt(event.target.closest("div").dataset.index, 10);
//     newTodo[index].isCompleted = true;
//     setTodoList(newTodo);
//   }

//   // loop over array and display each todo
//   const todoItem = todoList.map((todo, index) => {
//     return (
//       <div
//         data-index={index}
//         style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
//       >
//         <span>{todo}</span>
//         <button onClick={handleCompleteClick}>Complete</button>
//         <button onClick={handleDeleteClick}>X</button>
//       </div>
//     );
//   });

//   // updating the newTodo value with what is in the textbox
//   function handleChange(event) {
//     setNewTodo(event.target.value);
//   }

//   return (
//     <div className="main">
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={newTodo} onChange={handleChange} />
//         <button>Submit</button>
//       </form>
//       <section>{todoItem}</section>
//     </div>
//   );
// }
