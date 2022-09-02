const addButton = document.querySelector('.todo-add');
const toDoActiveArea = document.querySelector('.todo__active-area');
const toDoDoneArea = document.querySelector('.todo__done-area');
const todoIcon = document.querySelector('.todo__icon');
const todoIconAdaptive = document.querySelector('.todo__icon-adaptive');
const todoForm = document.querySelector('.todo__form');
const languageButtons = document.getElementsByName('language');

const writeTodoIcon = () => {
  if(languageButtons[0].checked) {
    todoIcon.textContent = 'TO DO List';
  }
  if(languageButtons[1].checked) {
    todoIcon.textContent = 'Список дел';
  }
}

const onClickDoneOrUnDone = ({ target }) => {
  const toDoItem = target.closest('.todo__item');
  const parent = toDoItem.parentNode;

  if (parent === toDoActiveArea) {
    toDoDoneArea.appendChild(toDoItem);
    makeItemDone(toDoItem);
  } else {
    toDoActiveArea.appendChild(toDoItem);
    makeItemUnDone(toDoItem);
  }
};

const onClickDelete = ({ target }) => {
  const toDoItem = target.closest('.todo__item');
  toDoItem.parentNode.removeChild(toDoItem);
};

const makeItemDone = (itemElement) => {
  const doneButton = itemElement.querySelector('.todo-item__done-button');
  const input = itemElement.querySelector('.todo-item__input');

  doneButton.classList.remove('fa-check');
  doneButton.classList.add('fa-rotate-left');
  input.classList.add('todo-item__input--crossed');
}

const makeItemUnDone = (itemElement) => {
  const doneButton = itemElement.querySelector('.todo-item__done-button');
  const input = itemElement.querySelector('.todo-item__input');

  doneButton.classList.add('fa-check');
  doneButton.classList.remove('fa-rotate-left');
  input.classList.remove('todo-item__input--crossed');
}

const createToDo = (value = '') => {
  const newToDoItem = document.createElement('div');
  newToDoItem.classList.add('todo__item');

  const toDoInput = document.createElement('span');
  toDoInput.role = 'textbox';
  toDoInput.innerHTML = value;
  toDoInput.contentEditable = true;
  toDoInput.classList.add('todo-item__input');

  const doneButton = document.createElement('button');
  doneButton.classList.add('todo-item__done-button', 'fa', 'fa-check');
  doneButton.addEventListener('click', onClickDoneOrUnDone);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('todo-item__delete-button', 'fa', 'fa-trash');
  deleteButton.addEventListener('click', onClickDelete);

  newToDoItem.append(toDoInput);
  newToDoItem.append(doneButton);
  newToDoItem.append(deleteButton);

  return newToDoItem;
}

const onClickAddButton = () => {
  const newTodo = createToDo();
  toDoActiveArea.append(newTodo);
};

const saveDataToLocalStorage = () => {
  const dataToLocalStorage = [];

  toDoActiveArea.childNodes.forEach(toDoItem => {
    const input = toDoItem.querySelector('.todo-item__input');
    
    if (input.textContent) {
      dataToLocalStorage.push({value: input.innerHTML, done: false})
    }
  });

  toDoDoneArea.childNodes.forEach(toDoItem => {
    const input = toDoItem.querySelector('.todo-item__input');
    if (input.textContent) {
      dataToLocalStorage.push({value: input.innerHTML, done: true})
    }
  });
  
  localStorage.setItem('toDoList', JSON.stringify(dataToLocalStorage));
}

const paintDataFromLocalStorage = () => {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('toDoList') ?? '[]');

  dataFromLocalStorage.forEach(item => {
    const newToDoItem = createToDo(item.value);

    if (item.done) {
      makeItemDone(newToDoItem);
      toDoDoneArea.append(newToDoItem);
    } else {
      toDoActiveArea.append(newToDoItem);
    }
  });
}

const toggleOpenTodo = () => {
  todoForm.classList.toggle('todo__form-open');
}

addButton.addEventListener('click', onClickAddButton);
window.addEventListener('beforeunload', saveDataToLocalStorage);
window.addEventListener('load', paintDataFromLocalStorage);
window.addEventListener('load', writeTodoIcon);
languageButtons.forEach(element => element.addEventListener('change', writeTodoIcon));
todoIcon.addEventListener('click', toggleOpenTodo);
todoIconAdaptive.addEventListener('click', toggleOpenTodo);
