let todoLists = JSON.parse(localStorage.getItem("todoLists")) || [];
function addTodoList() {
  const newTodoListName = document
    .getElementById("new-todo-input")
    .value.trim();

  if (!newTodoListName) {
    alert("Please enter a name for the todo list.");
    return;
  }
  const newTodoList = {
    name: newTodoListName,
    todos: [],
  };
  todoLists.push(newTodoList);

  updateHTML();

  localStorage.setItem("todoLists", JSON.stringify(todoLists));

  document.getElementById("new-todo-input").value = "";
}

function addTodoItem(listIndex) {
  const newTodoItemName = prompt("Enter the name of the todo item:");

  if (!newTodoItemName) {
    alert("Please enter a name for the todo item.");
    return;
  }

  const newTodoItem = {
    name: newTodoItemName,
    completed: false,
  };

  todoLists[listIndex].todos.push(newTodoItem);

  updateHTML();

  localStorage.setItem("todoLists", JSON.stringify(todoLists));
}

function toggleCompleted(listIndex, itemIndex) {
  const todoItem = todoLists[listIndex].todos[itemIndex];
  todoItem.completed = !todoItem.completed;

  const todoItemElement = document
    .querySelectorAll(".todo-list")
    [listIndex].querySelectorAll(".todo-list__item")[itemIndex];

  if (todoItem.completed) {
    todoItemElement.style.textDecoration = "line-through";
  } else {
    todoItemElement.style.textDecoration = "none";
  }

  localStorage.setItem("todoLists", JSON.stringify(todoLists));
}

function deleteTodoItem(listIndex, itemIndex) {
  todoLists[listIndex].todos.splice(itemIndex, 1);

  updateHTML();

  localStorage.setItem("todoLists", JSON.stringify(todoLists));
}
function deleteTodoList(listIndex) {
  todoLists.splice(listIndex, 1);

  updateHTML();

  localStorage.setItem("todoLists", JSON.stringify(todoLists));
}
function updateHTML() {
  const todoListsContainer = document.getElementById("todo-lists");

  todoListsContainer.innerHTML = "";

  for (let i = 0; i < todoLists.length; i++) {
    const todoList = todoLists[i];

    const todoListHTML = `
       <div class="todo-list">
         <h2 class="todo-list__name">${todoList.name}</h2>
         <ul class="todo-list__body">
           ${todoList.todos
             .map(
               (todoItem, j) => `
             <li class="todo-list__item">
             <input type="checkbox" ${
               todoItem.completed ? "checked" : ""
             } onchange="toggleCompleted(${i}, ${j})">
               ${todoItem.name}
               <button class="btn-delt-todo-item" onclick="deleteTodoItem(${i}, ${j})">×</button>
             </li>
           `
             )
             .join("")}
         </ul>
         <button class="btn-add-todo-item" onclick="addTodoItem(${i})">+</button>
         <button class="btn-delt-todo-list" onclick="deleteTodoList(${i})">×</button>
       </div>
     `;
    todoListsContainer.innerHTML += todoListHTML;
  }
}
updateHTML();
