const todoList = JSON.parse(localStorage.getItem('todoList')) || [
    { name: 'Review new design', dueDate: '2025-12-10' },
    { name: 'Master JavaScript', dueDate: '2025-12-31' }
];

let editIndex = null;

renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
        const { name, dueDate } = todoObject;
        const html = `
      <div class="todo-item">
        <div class="task-name">${name}</div>
        <div class="due-date">${dueDate || 'No Date'}</div> 
        <div class="action-buttons">
            <button class="action-btn edit-btn js-edit-todo-button" data-index="${index}">Edit</button>
            <button class="action-btn delete-btn js-delete-todo-button" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
        todoListHTML += html;
    });

    const listContainer = document.querySelector('.js-todo-list');
    listContainer.innerHTML = todoListHTML;

    if (todoList.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; color: var(--text-muted); padding: 20px;">No tasks yet. Add one above!</div>';
    }

    attachEventListeners();
}

function attachEventListeners() {
    // Delete buttons
    document.querySelectorAll('.js-delete-todo-button').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.dataset.index;
            // Add fade out effect?
            todoList.splice(index, 1);
            saveAndRender();
        });
    });

    // Edit buttons
    document.querySelectorAll('.js-edit-todo-button').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.dataset.index;
            editIndex = index;

            document.querySelector('.js-name-input').value = todoList[index].name;
            document.querySelector('.js-due-date-input').value = todoList[index].dueDate;

            const addButton = document.querySelector('.js-add-todo-button');
            addButton.innerHTML = 'Update';
            addButton.classList.add('update-button');

            document.querySelector('.js-name-input').focus();
        });
    });
}

document.querySelector('.js-add-todo-button').addEventListener('click', handleAddOrUpdate);

// Allow Enter key to submit
document.querySelector('.js-name-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddOrUpdate();
});

function handleAddOrUpdate() {
    const inputElement = document.querySelector('.js-name-input');
    const dateInputElement = document.querySelector('.js-due-date-input');
    const name = inputElement.value.trim();
    const dueDate = dateInputElement.value.trim();

    if (!name) {
        // Shake effect for error?
        inputElement.style.borderColor = 'var(--neon-pink)';
        setTimeout(() => inputElement.style.borderColor = '', 500);
        return;
    }

    if (editIndex !== null) {
        todoList[editIndex] = { name, dueDate };
        editIndex = null;

        const addButton = document.querySelector('.js-add-todo-button');
        addButton.innerHTML = 'Add';
        addButton.classList.remove('update-button');
    } else {
        todoList.push({ name, dueDate });
    }

    saveAndRender();
    inputElement.value = '';
    dateInputElement.value = '';
}

function saveAndRender() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
}

document.querySelector('.js-clear-all').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all tasks?')) {
        todoList.length = 0;
        saveAndRender();
    }
});
