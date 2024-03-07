import './index.css';

/*---------------------------------API Weather-app------------------------------------------- */
const apiKey = '6ef6af6313b24837877152925240703';
const linkApi =
   `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`

const info = {
   location: 'London',
   feelsLike: '0',
   uvi: '0',
}

const fetchData = async () => {
   const result = await fetch(`${linkApi}&q=${info.location}`);
   const data = await result.json();
   console.log(data);
}

fetchData();

/*--------------------------------- Popup weather city search ------------------------------------------- */

const btnSearchCity = document.querySelector('.weather__edit-btn');
const popupSearchCity = document.querySelector('.popup-city');
const formSearchCity = document.forms.popupSearchForm;
const inputSearchCity = formSearchCity.elements.inputSearch;
//const btnSubmitSearchCity = formSearchCity.elements.btnSubmitSearch;
const titleWeatherCity = document.querySelector('.weather__city');
//console.log(inputSearchCity);

btnSearchCity.addEventListener('click', () => {
   openPopup(popupSearchCity);
   inputSearchCity.value = titleWeatherCity.textContent;
})

formSearchCity.addEventListener('submit', function (evt) {
   evt.preventDefault();

   titleWeatherCity.textContent = inputSearchCity.value;
   closePopup(popupSearchCity);
})


/*---------------------------------Переключение вкладок aside------------------------------------------- */

// Кнопки aside
const btnAsideAll = Array.from(document.querySelectorAll('.aside__item'));
// Section для переключений
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
// объект для хранения id кнопки и класса иконки
const iconClasses = {
   'weather': 'icon-weather',
   'dashboard': 'icon-dashboard',
   'calendar': 'icon-calendar',
   'todo-list': 'icon-todo-list',
   'settings': 'icon-settings'
};

function removeAllActiveClasses() {
   btnAsideAll.forEach(tab => {
      tab.setAttribute('aria-selected', false);
      tab.classList.remove('aside__item-type-active');
      Object.values(iconClasses).forEach(iconClass => {
         document.querySelector('.' + iconClass).classList.remove(iconClass + '-active');
      });
   });
}

function addActiveClasses(id) {
   //.find() является методом для массивов, а не для коллекций в виде кнопок --> 
   // переделала btnAsideAll в массив с помощью Array.from
   btnAsideAll.find((tab) => tab.id === id).setAttribute('aria-selected', true);
   btnAsideAll.find((tab) => tab.id === id).classList.add('aside__item-type-active');
   document.querySelector('.' + iconClasses[id]).classList.add(iconClasses[id] + '-active');

   //второй вариант (есть не решенная ошибка)
   // const tab = btnAsideAll.querySelector(`#${id}`);
   // tab.setAttribute('aria-selected', true);
   // tab.classList.add('aside__item-type-active');
   // document.querySelector('.' + iconClasses[id]).classList.add(iconClasses[id] + '-active');
}

function getTabPanel(id) {
   return tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id);
}

function handleAsideClick(e) {
   // 1. Скрыть все tabPanels
   tabPanels.forEach(panel => panel.hidden = true);
   // 2. aria-selected = false у всех элементов
   removeAllActiveClasses();
   // 3. Поменять у кликнутой кнопки значение aria-selected на true
   const id = e.currentTarget.id;
   addActiveClasses(id);
   // 4. Отобразить нужный tapPanel
   getTabPanel(id).hidden = false;
}

// слушатель для всех кнопок aside
btnAsideAll.forEach(item => item.addEventListener('click', handleAsideClick))



/*---------------------------------ToDo-List------------------------------------------- */

const listToDo = document.querySelector('.list-todo');
const noTasksElement = document.querySelector('.no-list-todo');
const popup = document.querySelector('.popup-edit');
const popupAll = document.querySelectorAll('.popup');
const btnPopupClose = document.querySelectorAll('.popup__close');
const inputPopup = document.querySelector('.popup__input');
const btnSavePopup = document.querySelector('.popup__submit');

const formAddList = document.forms.add;
const inputTitleAdd = formAddList.elements.addInput;
const btnFormCreate = formAddList.elements.addBtn;
console.log(inputTitleAdd)

function openPopup(popup) {
   popup.classList.add('popup_opened');
}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

btnPopupClose.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});

function renderNoTasks() {
   noTasksElement.classList.remove('no-list-todo_hidden');
}

function renderHasTasks() {
   noTasksElement.classList.add('no-list-todo_hidden');
}

function setSubmitButtonState(isFormValid) {
   if (isFormValid) {
      btnFormCreate.removeAttribute('disabled');
      btnFormCreate.classList.remove('btn_disable');
   } else {
      btnFormCreate.setAttribute('disabled', true);
      btnFormCreate.classList.add('btn_disable');
   }
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


//--------Обработчик на Enter ненужен, т.к. происходит и так происходит submit, 
//--------если пользователь находится в одном из полей формы. 
//--------Поэтому дополнительные обработчики нажатия клавиш для сабмита делать не нужно.

// formAddList.addEventListener('keydown', function (evt) {
//    if (evt.key === 'Enter') {
//       if (inputTitleAdd.value.length !== 0) {
//          addTasks(inputTitleAdd.value);
//          renderHasTasks();
//          //setSubmitButtonState(false);

//       }
//    }
// });

function closePopupEsc(evt) {
   if (evt.key === 'Escape') {
      const popupVisible = document.querySelector('.popup_opened')
      closePopup(popupVisible);
   }
}

document.addEventListener('keydown', closePopupEsc);

formAddList.addEventListener('submit', function (evt) {
   evt.preventDefault();

   addTasks(inputTitleAdd.value);
   renderHasTasks();
   setSubmitButtonState(false);
   formAddList.reset();
})

formAddList.addEventListener('input', function (evt) {
   const isValid = inputTitleAdd.value.length > 0;
   setSubmitButtonState(isValid)
})


/*---------------------------------Таймер------------------------------------------- */
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