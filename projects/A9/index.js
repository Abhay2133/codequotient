const $ = q => document.querySelector(q);

const form = $("#input-form")
const input = $("#input-box");
const tasks = $("#tasks");

const tasksData = {};
let _idx = 1;

function createTask({ name, id, isFinished }) {
    let task = document.createElement("div");
    task.className = "task";
    task.id = id;
    task.setAttribute("data-edit-mode", "off");
    task.innerHTML = `<div class="task-name">${name}</div>
                    <div class="action-buttons">
                        <button class="action-button" onclick="editTask(${id})" ${isFinished ? "disabled":""}>
                            <span class="edit-icon">✏️</span>
                            <span class="done-icon">✔️</span>
                        </button>
                        <input type="checkbox" class="action-button" onclick="finishTask(${id})" ${isFinished ? "checked" : ""}>
                        <button class="action-button"  onclick="deleteTask(${id})">❌</button>
                    </div>`;

    tasks.append(task);
    tasksData[id] = { id, name, isFinished, inEditMode: false, dom: task, nameDom: task.firstElementChild };

    saveTasksData();
}

function saveTasksData() {
    localStorage.setItem("tasks-list", JSON.stringify({ ...tasksData }));
}

function loadTaskList() {
    let data;
    try { data = JSON.parse(localStorage.getItem("tasks-list") || "{}") } catch (e) { return; }
    for (let key in data) {
        // tasksData[key] = data[key];
        createTask(data[key]);
    }
    if(Object.keys(data).length) _idx = 1 + Math.max(...Object.keys(data));
}

function editTask(id) {
    if (!tasksData.hasOwnProperty(id)) return;
    if(tasksData[id].isFinished) return;
    if (tasksData[id].inEditMode) {
        tasksData[id].inEditMode = false;
        tasksData[id].dom.setAttribute("data-edit-mode", "off");
        tasksData[id].nameDom.contentEditable = false;
        tasksData[id].name = tasksData[id].nameDom.textContent;
        saveTasksData();
    } else {
        tasksData[id].inEditMode = true;
        tasksData[id].dom.setAttribute("data-edit-mode", "on");
        tasksData[id].nameDom.contentEditable = true;
        setTimeout(() => tasksData[id].nameDom.focus(), 0);
    }
}

function deleteTask(id) {
    if (!tasksData.hasOwnProperty(id)) return;
    tasksData[id].dom.remove();
    delete tasksData[id];
    saveTasksData();
}

function finishTask(id) {
    if (!tasksData.hasOwnProperty(id)) return;
    tasksData[id].isFinished = !tasksData[id].isFinished;
    let editButton = tasksData[id].dom.children[1].firstElementChild;
    editButton.disabled = tasksData[id].isFinished;
    saveTasksData();
}

window.addEventListener("load", loadTaskList);
form.addEventListener("submit", e => {
    e.preventDefault();
    if (!(input.value || "").trim()) return
    createTask({ name: input.value.trim(), id: _idx++, isFinished: false })
    input.value=""
})