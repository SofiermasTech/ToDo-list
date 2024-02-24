import './index.css';

const inputTitle = document.getElementById('input-title');
const btnCreate = document.getElementById('btn-create');
const listToDo = document.querySelector('.list-todo');
const noTasksElement = document.querySelector('.no-list-todo');
const popup = document.querySelector('.popup-edit');
const btnPopupClose = document.querySelector('.popup__close');
const inputPopup = document.querySelector('.popup__input');
const btnSavePopup = document.querySelector('.popup__submit');


function openPopup(popup) {
   popup.classList.add('popup-edit_opened');
}

function closePopup(popup) {
   popup.classList.remove('popup-edit_opened');
}

btnPopupClose.addEventListener('click', () => closePopup(popup));


function renderNoTasks() {
   noTasksElement.classList.remove('no-list-todo_hidden');
}

function renderHasTasks() {
   noTasksElement.classList.add('no-list-todo_hidden');
}

function addTasks(inputValue) {
   const todoTemplate = document.querySelector('#todo-template').content;
   const todoElement = todoTemplate.querySelector('.list-todo__item').cloneNode(true);
   const btnDeleted = todoElement.querySelector('.list-todo__btn-deleted');
   const btnDone = todoElement.querySelector('.list-todo__btn-done');
   const btnEdit = todoElement.querySelector('.list-todo__btn-edit');
   const titleToDoList = todoElement.querySelector('.list-todo__item-title');

   titleToDoList.textContent = inputValue;

   btnDone.addEventListener('click', (evt) => {
      evt.target.classList.toggle('list-todo__btn-done_active');
      titleToDoList.classList.toggle('list-todo__item-title_done');
   })

   btnEdit.addEventListener('click', () => {
      openPopup(popup)
      inputPopup.value = titleToDoList.textContent;
   })

   btnDeleted.addEventListener('click', () => {
      const listToDoItem = btnDeleted.closest('.list-todo__item');
      listToDoItem.remove();

      if (listToDo.children.length === 0) {
         renderNoTasks();
      }
   })

   function savePopupEdit(evt) {
      evt.preventDefault();

      titleToDoList.textContent = inputPopup.value;
      closePopup(popup);
   }

   btnSavePopup.addEventListener('click', savePopupEdit);

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