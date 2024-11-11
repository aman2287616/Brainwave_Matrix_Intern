const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notification-message");
const closeNotification = document.getElementById("close-notification");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", showTasks);

// Array to hold tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  if (inputBox.value === "") {
    showNotification("You must write something!");
    return;
  }

  const task = { text: inputBox.value, checked: false };
  tasks.push(task);
  saveData();
  renderTasks();
  showNotification("Task added successfully!");
  inputBox.value = "";
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask !== null && newTask !== "") {
    tasks[index].text = newTask;
    saveData();
    renderTasks();
    showNotification("Task edited successfully!");
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveData();
  renderTasks();
  showNotification("Task deleted successfully!");
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.checked) {
      li.classList.add("checked");
    }
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.onclick = function () {
      task.checked = checkbox.checked;
      saveData();
      renderTasks();
    };

    const editSpan = document.createElement("span");
    editSpan.innerHTML = "✏️";
    editSpan.onclick = function () {
      editTask(index);
    };

    const deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "✖️";
    deleteSpan.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(editSpan);
    li.appendChild(deleteSpan);
    listContainer.appendChild(li);
  });
}

function showTasks() {
  renderTasks();
}

function showNotification(message) {
  notificationMessage.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

closeNotification.onclick = () => {
  notification.style.display = "none";
};
