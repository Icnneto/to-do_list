const form = document.getElementById('form');
const inputForm = document.getElementById('form__input');
const boardLane = document.getElementById('board__lane');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newDiv = document.createElement('div');
    newDiv.classList.add('task')

    // adicionar o texto do input na div
    const text = inputForm.value;
    
    if (!text){
        return;
    }

    const newTask = document.createElement('p');
    newTask.classList.add('task__content');
    newTask.innerText = text;

    newDiv.appendChild(newTask);

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
    inputForm.value = '';
});


function deleteTask(e) {
   const div = e.target.closest('.task');
   div.remove();
};
