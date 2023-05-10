const task = [];
let time = 0;
let timer = null;
let timerbreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value != "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  task.unshift(newTask);
}

function renderTasks(){
    const html = task.map(task => {
        return `
            <div class="task">
                <div class='completed'></div>
                <div class='title'></div>
            </div>
        `;
    })
}
