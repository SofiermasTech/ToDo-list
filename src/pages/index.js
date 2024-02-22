import './index.css';

const inputTitle = document.getElementById('input-title');
const btnCreate = document.getElementById('btn-create');
const listToDo = document.querySelector('.list-todo');
const btnDeleted = document.querySelector('.list-todo__btn-deleted');


const tasks = [
   'Сделать проектную работу',
   'Погулять с собакой',
   'Пройти туториал по Реакту'
];

function addTasks(inputValue) {
   //  const listElements = [];
   //  for (let i = 0; i < tasks.length; i++) {
   const toDoItem = document.createElement('li');
   toDoItem.classList.add('list-todo__item');

   const toDoItemTitle = document.createElement('p');
   toDoItemTitle.classList.add('list-todo__item-title');
   toDoItemTitle.textContent = inputValue;

   const toDoItemBtnDeleted = document.createElement('button');
   toDoItemBtnDeleted.classList.add('list-todo__btn-deleted');

   toDoItem.append(toDoItemTitle, toDoItemBtnDeleted);
   listToDo.append(toDoItem);

  // // toDoItem.textContent = tasks[i];
   // listElements[i] = toDoItem;
   //   }

   // for (let i = 0; i < listElements.length; i++) {
   //    listToDo.append(listElements[i], )
   // }

   toDoItemBtnDeleted.addEventListener('click', () => {
      const listToDoItem = toDoItemBtnDeleted.closest('.list-todo__item');
      listToDoItem.remove();
   })
}

btnCreate.addEventListener('click', () => {
   if (inputTitle.value.length === 0) {
      return;
   }

   addTasks(inputTitle.value);
   // listToDo.insertAdjacentHTML(
   //    'beforeend',
   //    getNoteTemplate(inputTitle.value)
   // )

   inputTitle.value = '';
})


// function getNoteTemplate(title) {
//    return `
//    <li class="list-todo__item">
//                      <p class="list-todo__item-title">${title}</p>
//                      <button class="list-todo__btn-deleted"></button>
//                   </li>`
// }