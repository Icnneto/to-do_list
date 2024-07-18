const form = document.getElementById('form');
const inputForm = document.getElementById('form__input');
const boardLane = document.getElementById('board__lane');
let StrikeLineEnable = true;

let taskList = localStorage.getItem('newTask') ? JSON.parse(localStorage.getItem('newTask')): [];

// taskList.forEach(element => {
// });

form.addEventListener('submit', (e) => {
    createDivTask(e);
    inputForm.value = '';
});

function createDivTask(e) {
    e.preventDefault();
    const newDiv = document.createElement('div');
    newDiv.classList.add('task')
    newDiv.setAttribute('draggable', 'true');
    newDiv.setAttribute('id', 'task-' + Date.now());
    
    const text = inputForm.value;
    
    if (!text){
        return;
    }

    const newTask = document.createElement('p');
    newTask.classList.add('task__content');
    newTask.innerText = text;
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

    const tasks = {
        id: newDiv.id,
        text: text
    }

    taskList.push(tasks);
    localStorage.setItem('newTask', JSON.stringify(taskList));
    console.log(taskList);

}


function deleteTask(e) {
    const div = e.target.closest('.task');
    const elementToRemove = div.id;
   
    if (confirm('Are you sure?')) {
        div.remove();

        const indexRemove = taskList.indexOf(taskList.find((elementId) => elementId.id === elementToRemove));
        console.log(indexRemove);
        taskList.splice(indexRemove, 1);

        localStorage.setItem('newTask', JSON.stringify(taskList));
    }
    console.log(taskList);
};


function strikeLineTask(e) {
    const task = e.target.closest('.task');
    const text = task.firstChild;

    if (!StrikeLineEnable) {
        text.classList.add('.task__content');
        text.classList.remove('task__content-lineThrough');
        StrikeLineEnable = true;  
    } else {
        text.classList.remove('.task__content');
        text.classList.add('task__content-lineThrough');
        StrikeLineEnable = false; 
    };
};
