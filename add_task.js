const form = document.getElementById('form');
const inputForm = document.getElementById('form__input');
const boardLane = document.getElementById('board__lane');
let StrikeLineEnable = true;

let taskList = localStorage.getItem('newTask') ? JSON.parse(localStorage.getItem('newTask')): [];

function createTaskElement(task) {
    
    const newDiv = document.createElement('div');
    newDiv.classList.add('task')
    newDiv.setAttribute('draggable', 'true');
    newDiv.setAttribute('id', task.id);
    
    const newTask = document.createElement('p');
    newTask.classList.add('task__content');
    if (task.striked) {
        newTask.classList.add('task__content-lineThrough');
    }
    newTask.innerText = task.text;
    newDiv.appendChild(newTask);

    const newStrikeButton = document.createElement('button');
    newStrikeButton.classList.add('task__strike-button');
    newStrikeButton.onclick = strikeLineTask;

    const imgStrikeButtonOff = document.createElement('img');
    imgStrikeButtonOff.src = 'assets/tachado_off.svg';
    imgStrikeButtonOff.classList.add('task__strike_off-img');

    const imgStrikeButtonOn = document.createElement('img');
    imgStrikeButtonOn.src = 'assets/tachado_on.svg';
    imgStrikeButtonOn.classList.add('task__strike_on-img');

    newStrikeButton.appendChild(imgStrikeButtonOff);
    newStrikeButton.appendChild(imgStrikeButtonOn);
    newDiv.appendChild(newStrikeButton);

    const newButton = document.createElement('button');
    newButton.classList.add('task__delete-button');
    newButton.onclick = deleteTask;

    const imgButton = document.createElement('img');
    imgButton.src = 'assets/grey_delete.svg';
    imgButton.classList.add('task__delete-img');

    const imgButtonHover = document.createElement('img');
    imgButtonHover.src = 'assets/red_delete_hover.svg';
    imgButtonHover.classList.add('task__delete-img-red');

    newButton.appendChild(imgButton);
    newButton.appendChild(imgButtonHover);

    newDiv.appendChild(newButton);

    boardLane.appendChild(newDiv);
}

taskList.forEach(task => {
    createTaskElement(task);
});

form.addEventListener('submit', (e) => {
    createDivTask(e);
    inputForm.value = '';
});

function createDivTask(e) {
    e.preventDefault();
    const text = inputForm.value;
    
    if (!text) {
        return;
    }

    const task = {
        id: 'task-' + Date.now(),
        text: text,
        striked: false
    };

    createTaskElement(task);

    taskList.push(task);
    localStorage.setItem('newTask', JSON.stringify(taskList));
}

function deleteTask(e) {
    const div = e.target.closest('.task');
    const elementToRemove = div.id;
   
    if (confirm('Are you sure?')) {
        div.remove();

        const indexRemove = taskList.indexOf(taskList.find(task => task.id === elementToRemove));
        taskList.splice(indexRemove, 1);

        localStorage.setItem('newTask', JSON.stringify(taskList));
    }
};

function strikeLineTask(e) {
    const taskElement = e.target.closest('.task');
    const taskId = taskElement.id;
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    const task = taskList[taskIndex];

    const textElement = taskElement.querySelector('.task__content');

    if (task.striked) {
        textElement.classList.remove('task__content-lineThrough');
        task.striked = false;
    } else {
        textElement.classList.add('task__content-lineThrough');
        task.striked = true;
    }

    taskList[taskIndex] = task;
    localStorage.setItem('newTask', JSON.stringify(taskList));
};
