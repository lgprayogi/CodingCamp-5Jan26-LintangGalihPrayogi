let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoDate = document.getElementById('todoDate');

    if (todoInput.value === '' || todoDate.value === '') {
        alert('Please fill in both the todo and date.');
        return;
    }

    const newTodo = {
        task: todoInput.value,
        date: todoDate.value
    };

    todos.push(newTodo);
    renderTodos();

    todoInput.value = '';
    todoDate.value = '';
}

function renderTodos(list) {
    const data = Array.isArray(list) ? list : todos;
    const todoList = document.getElementById('todoList');

    todoList.innerHTML = '';

    if (data.length === 0) {
        todoList.innerHTML = '<li>No todos available</li>';
        return;
    }

    data.forEach((todo) => {
        const li = document.createElement('li');
        li.innerHTML = `<p class="text-xl">${escapeHtml(todo.task)} <span class="text-sm text-gray-500">(${todo.date})</span></p><hr />`;
        todoList.appendChild(li);
    });
}

function removeAllTodo() {
    todos = [];
    renderTodos();
}

function toggleFilter() {
    const menu = document.getElementById('filterOptions');
    if (!menu) return;
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

function useFilter(type) {
    let sorted = [...todos];

    if (type === 'nameAsc') {
        sorted.sort((a, b) => a.task.localeCompare(b.task));
    }
    if (type === 'nameDesc') {
        sorted.sort((a, b) => b.task.localeCompare(a.task));
    }
    if (type === 'dateOld') {
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (type === 'dateNew') {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderTodos(sorted);
}

// small helper to avoid inserting raw HTML from user input
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}