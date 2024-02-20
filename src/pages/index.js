import './index.css';

const inputTitle = document.getElementById('input-title');
const btnCreate = document.getElementById('btn-create');
const listToDo = document.querySelector('.list-todo');
const btnDeleted = document.querySelector('.list-todo__btn-deleted');

btnCreate.addEventListener('click', () => {
   if (inputTitle.value.length === 0) {
      return;
   }

   listToDo.insertAdjacentHTML(
      'beforeend',
      getNoteTemplate(inputTitle.value)
   )
   inputTitle.value = '';
})

function getNoteTemplate(title) {
   return `
   <li class="list-todo__item">
                     <p class="list-todo__item-title">${title}</p>
                     <button class="list-todo__btn-deleted"></button>
                  </li>`
}