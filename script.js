const taskInput = document.getElementById("task-input");
const list = document.getElementById("list");
const noTasks = document.getElementById("no-tasks");
const completeTask = document.querySelectorAll(".complete");
const deleteTask = document.querySelectorAll(".delete");
let newTask;

const saveToLS = () => {
  localStorage.setItem("tasks_LS", list.innerHTML);
};

const displayLS = () => {
  list.innerHTML = localStorage.getItem("tasks_LS");
  if (list.childElementCount === 0) {
    noTasks.style.display = "block";
  } else {
    noTasks.style.display = "none";
  }
};

displayLS();

taskInput.addEventListener("input", (e) => (newTask = e.target.value));

const addTask = (e) => {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Por favor, ingresa una tarea.");
  } else {
    noTasks.style.display = "none";
    const li = document.createElement("li");

    li.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "rounded-sm",
      "bg-slate-50",
      "p-2",
      "drop-shadow-sm",
    );

    li.innerHTML = `
          <p>${newTask}</p>
          <span class="flex items-center gap-2 text-xl">
          <span class="delete text-red-400 cursor-pointer">✕</span>
          <span class="complete text-green-400 cursor-pointer">✓</span>
          </span>
          `;

    list.appendChild(li);

    taskInput.value = "";

    saveToLS();
  }
};

form.addEventListener("submit", addTask);

const handleComplete = (e) => {
  if (e.target.classList.contains("complete")) {
    let targetedTask = e.target.parentElement.previousElementSibling;
    targetedTask.classList.toggle("line-through");
    saveToLS();
  }
};

const handleDelete = (e) => {
  if (e.target.classList.contains("delete")) {
    let targetedTask = e.target.parentElement.parentElement;
    targetedTask.remove();
    if (list.childElementCount === 0) {
      noTasks.style.display = "block";
    }
    saveToLS();
  }
};

list.addEventListener("click", handleComplete);
list.addEventListener("click", handleDelete);
