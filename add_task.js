const form = document.getElementById('form');
const inputForm = document.getElementById('form__input');
const boardLane = document.getElementById('board__lane');
let StrikeLineEnable = true;
let memoryArr = [];

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
    
    // adicionar o texto do input na div
    const text = inputForm.value;
    
    if (!text){
        return;
    }

    const newTask = document.createElement('p');
    newTask.classList.add('task__content');
    newTask.innerText = text;

    newDiv.appendChild(newTask);

    // adicionar o botão de tachar
    const newStrikeButton = document.createElement('button');
    newStrikeButton.classList.add('task__strike-button');
    newStrikeButton.onclick = strikeLineTask;

    // adicionando a imagem
    const imgStrikeButtonOff = document.createElement('img');
    imgStrikeButtonOff.src = 'assets/tachado_off.svg';
    imgStrikeButtonOff.classList.add('task__strike_off-img');
    
    // adicionando a imagem do hover
    const imgStrikeButtonOn = document.createElement('img');
    imgStrikeButtonOn.src = 'assets/tachado_on.svg';
    imgStrikeButtonOn.classList.add('task__strike_on-img');

    // integrando imagens no botão
    newStrikeButton.appendChild(imgStrikeButtonOff);
    newStrikeButton.appendChild(imgStrikeButtonOn);

    // integrando botão a div
    newDiv.appendChild(newStrikeButton);

    // adicionar o botão de deletar
    const newButton = document.createElement('button');
    newButton.classList.add('task__delete-button');
    newButton.onclick = deleteTask;

    // adicionando a imagem
    const imgButton = document.createElement('img');
    imgButton.src = 'assets/grey_delete.svg';
    imgButton.classList.add('task__delete-img');

    // adicionando a imagem do hover
    const imgButtonHover = document.createElement('img');
    imgButtonHover.src = 'assets/red_delete_hover.svg';
    imgButtonHover.classList.add('task__delete-img-red');

    // integrando imagens no botão
    newButton.appendChild(imgButton);
    newButton.appendChild(imgButtonHover);

    // integrando botão a div
    newDiv.appendChild(newButton);

    boardLane.appendChild(newDiv);
    console.log(newDiv.id);
    memoryArr.push(newDiv);
    console.log(memoryArr);
}

function deleteTask(e) {
    const div = e.target.closest('.task');
   
    if (confirm('Are you sure?')) {
        div.remove();
        const indexRemove = memoryArr.indexOf(div);
        memoryArr.splice(indexRemove, 1);
    }
    console.log(memoryArr);
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
