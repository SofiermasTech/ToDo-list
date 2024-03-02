import './index.css';

// Переключение вкладок 
// Кнопки aside
const btnAsideAll = document.querySelectorAll('.aside__item');
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
// const btnDashboard = document.getElementById('dashboard');
// const btnCalendar = document.getElementById('calendar');
// const btnToDoList = document.getElementById('todo-list');
const btnIcon = document.querySelectorAll('.aside__item-img');

// Section для переключений
// const sectionDashboard = document.getElementById('section-dashboard');
// const sectionStatistic = document.getElementById('section-statistic');
// const sectionCalendar = document.getElementById('section-calendar');
// const ToDoList = document.getElementById('section-todoList');

function changeIconBtn() {
   btnAsideAll.forEach((tab) => {
      if (tab.getAttribute('aria-selected', true)) {
         if (tab.id === 'statistic') {
            console.log(tab)
            document.querySelector('.icon-statistic').classList.add('icon-statistic-active');
         }
         


         

      }
   })
}


// логика
function handleAsideClick(e) {
   // 1. Скрыть все tabPanels
   tabPanels.forEach(function (panel) {
      panel.hidden = true;
      console.log(panel)
   })
   // 2. aria-selected = false у всех элементов
   btnAsideAll.forEach((tab) => {
      tab.setAttribute('aria-selected', false);
      tab.classList.remove('aside__item-type-active');
      document.querySelector('.icon-statistic').classList.remove('icon-statistic-active');
      document.querySelector('.icon-dashboard').classList.remove('icon-dashboard-active');
      document.querySelector('.icon-todo-list').classList.remove('icon-todo-list-active');
      document.querySelector('.icon-calendar').classList.remove('icon-calendar-active');
      document.querySelector('.icon-settings').classList.remove('icon-settings-active');
   })
   // removeIconBtn();
   // 3. Поменять у кликнутой кнопки значение aria-selected на true
   e.currentTarget.setAttribute('aria-selected', true);
   e.currentTarget.classList.add('aside__item-type-active');
   console.log(e.currentTarget);
   if (e.currentTarget.id === 'statistic') {
      console.log(e.currentTarget.id)
      document.querySelector('.icon-statistic').classList.add('icon-statistic-active');
   }
   if (e.currentTarget.id === 'dashboard') {
      document.querySelector('.icon-dashboard').classList.add('icon-dashboard-active');
   }
   if (e.currentTarget.id === 'calendar') {
      document.querySelector('.icon-calendar').classList.add('icon-calendar-active');
   }
   if (e.currentTarget.id === 'todo-list') {
      document.querySelector('.icon-todo-list').classList.add('icon-todo-list-active');
   }
   if (e.currentTarget.id === 'settings') {
      document.querySelector('.icon-settings').classList.add('icon-settings-active');
   }
   
   // 4. Отобразить нужный tapPanel
   const { id } = e.currentTarget;
   const tabPanel = tabPanels.find(panel => {
      if (panel.getAttribute('aria-labelledby') === id) {
         return true;
      }
   })
   //console.log(tabPanel);
   tabPanel.hidden = false;
}

// слушатель для всех кнопок aside
btnAsideAll.forEach(item => item.addEventListener('click', handleAsideClick))


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

   function loadValueForm() {
      inputPopup.value = titleToDoList.textContent;
   }


   btnDone.addEventListener('click', (evt) => {
      evt.target.classList.toggle('list-todo__btn-done_active');
      titleToDoList.classList.toggle('list-todo__item-title_done');
   })

   btnEdit.addEventListener('click', () => {
      openPopup(popup);
      loadValueForm();

      function handlePopupEditSubmit(evt) {
         evt.preventDefault();

         titleToDoList.textContent = inputPopup.value;
         closePopup(popup);
      }

      btnSavePopup.addEventListener('click', handlePopupEditSubmit);
   })

   btnDeleted.addEventListener('click', () => {
      const listToDoItem = btnDeleted.closest('.list-todo__item');
      listToDoItem.remove();

      if (listToDo.children.length === 0) {
         renderNoTasks();
      }
   })

   listToDo.append(todoElement);
}


function keyHandler(evt) {
   if (evt.key === 'Enter') {
      addTasks(inputTitle.value);
   }
}

inputTitle.addEventListener('keydown', keyHandler);

function closePopupEsc(evt) {
   if (evt.key === 'Escape') {
      const popupVisible = document.querySelector('.popup-edit_opened')
      closePopup(popupVisible);
   }
}

document.addEventListener('keydown', closePopupEsc);

btnCreate.addEventListener('click', () => {
   if (inputTitle.value.length === 0) {
      return;
   }

   addTasks(inputTitle.value);
   renderHasTasks();

   inputTitle.value = '';
})


let mode = 'time';
const btnFull = document.getElementById('full');
const btnDate = document.getElementById('date');
const btnTime = document.getElementById('time');
const output = document.querySelector('.section-time__data');

btnFull.onclick = bindMode('full');

btnDate.onclick = bindMode('date');

btnTime.onclick = bindMode('time');

function bindMode(name) {
   return function () {
      mode = name;
      update();
   }

}

update();
setInterval(update, 1000);

function update() {
   output.textContent = format(mode);
}

function format(formatMode) {
   const now = new Date();

   switch (formatMode) {
      case 'time':
         return now.toLocaleTimeString();
      case 'date':
         return now.toLocaleDateString();
      case 'full':
         return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
      default:
         return now.toLocaleTimeString();
   }
}