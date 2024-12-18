document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-cta');
    const taskForm = document.getElementById('task-form');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');
    const setTaskOverlay = document.getElementById('set-task-overlay');
    const closeButton = document.querySelector('.close-button');

    // Show the task overlay when the "Add task" button is clicked
    addTaskButton.addEventListener('click', () => {
        setTaskOverlay.classList.remove('hide');
    });

    // Close the task overlay when the close button is clicked
    closeButton.addEventListener('click', () => {
        setTaskOverlay.classList.add('hide');
    });

    // Handle form submission to add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const dueDate = `${document.getElementById('due-date-day').value}/${document.getElementById('due-date-month').value}/${document.getElementById('due-date-year').value}`;
        const status = document.querySelector('input[name="status-option"]:checked').value;

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <button class="task-button">
                <p class="task-name">${name}</p>
                <p class="task-due-date">Due on ${dueDate}</p>
                <iconify-icon icon="material-symbols:arrow-back-ios-rounded" style="color: black" width="18" height="18" class="arrow-icon"></iconify-icon>
            </button>
            <button class="delete-button" style="margin-left: 10px;">
                <iconify-icon icon="ic:round-delete" style="color: red" width="18" height="18"></iconify-icon>
            </button>
        `;

        // Append the task item to the appropriate list based on its status
        if (status === 'To do') {
            todoList.appendChild(taskItem);
        } else if (status === 'Doing') {
            doingList.appendChild(taskItem);
        } else {
            doneList.appendChild(taskItem);
        }

        // Show notification
        notificationMessage.textContent = 'Task added successfully!';
        notification.classList.remove('hide');
        setTimeout(() => {
            notification.classList.add('hide');
        }, 3000);

        // Reset the form and hide the overlay
        taskForm.reset();
        setTaskOverlay.classList.add('hide');

        // Add event listener for the delete button
        const deleteButton = taskItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
            notificationMessage.textContent = 'Task deleted successfully!';
            notification.classList.remove('hide');
            setTimeout(() => {
                notification.classList.add('hide');
            }, 3000);
        });
    });
});