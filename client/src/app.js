document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
    <section>
        <h1 id="h">Kanban Board</h1>
        <div id="lists" style="display: flex; justify-content: space-between;">
            <div class="list" id="todo" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h2>To Do</h2>
                <button onclick="addTask('todo')">Add Task</button>
            </div>
            <div class="list" id="inProgress" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h2>Doing</h2>
                <button onclick="addTask('inProgress')">Add Task</button>
            </div>
            <div class="list" id="done" ondrop="drop(event)" ondragover="allowDrop(event)">
                <h2>Done</h2>
                <button onclick="addTask('done')">Add Task</button>
            </div>
        </div>
    </section>
    `;
});

function addTask(listId) {
    const list = document.getElementById(listId);
    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true;
    task.ondragstart = drag;
    task.id = 'task-' + Date.now();

    task.innerHTML = `
        <div>
            <label>Title: <input type="text" id="taskTitle" placeholder="Task title"></label>
        </div>
        <div>
            <label>Description: <input type="text" id="taskDescription" placeholder="Task description"></label>
        </div>
        <div>
            <label>Due Date: <input type="date" id="taskDueDate"></label>
        </div>
        <div>
            <label>Priority:
                <select id="taskPriority">
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label>
        </div>
        <button onclick="saveTask(this)">Save Task</button>
        <button onclick="deleteTask(this)">Cancel</button>
    `;
    list.appendChild(task);
}

function saveTask(button) {
    const task = button.parentElement;

    const title = task.querySelector('#taskTitle').value.trim();

    if (!title) {
        alert('Please enter a title before saving.');
        return;
    }

    const description = task.querySelector('#taskDescription').value.trim();
    const dueDate = task.querySelector('#taskDueDate').value;
    const priority = task.querySelector('#taskPriority').value;

    task.innerHTML = `
        <strong>${title}</strong><br>
        <p>${description}</p>
        <p>Due: ${dueDate}</p>
        <p>Priority: ${priority}</p>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
}

function editTask(button) {
    const task = button.parentElement;

    const title = task.querySelector('strong').innerText;
    const description = task.querySelector('p').innerText;
    const dueDate = task.querySelector('p:nth-of-type(1)').innerText.split('Due: ')[1];
    const priority = task.querySelector('p:nth-of-type(2)').innerText.split('Priority: ')[1];

    task.innerHTML = `
        <div>
            <label>Title: <input type="text" id="taskTitle" value="${title}" placeholder="Task title"></label>
        </div>
        <div>
            <label>Description: <input type="text" id="taskDescription" value="${description}" placeholder="Task description"></label>
        </div>
        <div>
            <label>Due Date: <input type="date" id="taskDueDate" value="${dueDate}"></label>
        </div>
        <div>
            <label>Priority:
                <select id="taskPriority">
                    <option value="">Select Priority</option>
                    <option value="Low" ${priority === 'Low' ? 'selected' : ''}>Low</option>
                    <option value="Medium" ${priority === 'Medium' ? 'selected' : ''}>Medium</option>
                    <option value="High" ${priority === 'High' ? 'selected' : ''}>High</option>
                </select>
            </label>
        </div>
        <button onclick="saveTask(this)">Save Task</button>
        <button onclick="deleteTask(this)">Cancel</button>
    `;
}

function deleteTask(button) {
    button.parentElement.remove();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedTask = document.getElementById(data);
    if (draggedTask) {
        event.target.appendChild(draggedTask);
    }
}
