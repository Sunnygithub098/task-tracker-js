const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// লোকাল স্টোরেজ থেকে টাস্কগুলো ফেচ করে আনা
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// পেজ লোড হওয়ার সাথে সাথে টাস্কগুলো UI তে দেখানো
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.toggle('completed', task.completed);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.classList.toggle('completed', task.completed);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

renderTasks();

// নতুন টাস্ক যোগ করার ফাংশন
function addTask() {
    const newTask = {
        text: taskInput.value,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}