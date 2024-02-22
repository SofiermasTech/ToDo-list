import './index.css';

const inputTitle = document.getElementById('input-title');
const btnCreate = document.getElementById('btn-create');
const listToDo = document.querySelector('.list-todo');
const noTasksElement = document.querySelector('.no-list-todo');

function renderNoTasks() {
   noTasksElement.classList.remove('no-list-todo_hidden');
}

function renderHasTasks() {
   noTasksElement.classList.add('no-list-todo_hidden');
}

function addTasks(inputValue) {
   const todoTemplate = document.querySelector('#todo-template').content;
   const todoElement = todoTemplate.querySelector('.list-todo__item').cloneNode(true);

   todoElement.querySelector('.list-todo__item-title').textContent = inputValue;
   const BtnDeleted = todoElement.querySelector('.list-todo__btn-deleted');
   const BtnDone = todoElement.querySelector('.list-todo__btn-done');


   BtnDone.addEventListener('click', (evt) => {
      evt.target.classList.toggle('list-todo__btn-done_active');
   })


   BtnDeleted.addEventListener('click', () => {
      const listToDoItem = BtnDeleted.closest('.list-todo__item');
      listToDoItem.remove();

      if (listToDo.children.length === 0) {
         renderNoTasks();
      }
   })
   listToDo.append(todoElement);
}

// function disabledBtn() {
//    if (inputTitle.value.length === 0) {
//       btnCreate.classList.add('btn_disable');
//       btnCreate.setAttribute('disabled', true);
//       return;
//    } else if (inputTitle.value.length !== 0) {
//       btnCreate.classList.remove('btn_disable');
//       btnCreate.removeAttribute('disabled', false);
//    }
// }
// disabledBtn();

btnCreate.addEventListener('click', () => {
   if (inputTitle.value.length === 0) {
      return;
   }

   addTasks(inputTitle.value);
   renderHasTasks();

   inputTitle.value = '';
})