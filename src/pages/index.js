import './index.css';

/*---------------------------------Работа с датами header +  weather template------------------------------------------- */



const formatter = new Intl.DateTimeFormat('ru', {
   weekday: 'short',
   //   year: 'numeric',
   //   month: 'numeric',
   //   day: 'numeric',
   //   hour: 'numeric',
   //   minute: 'numeric',
   //   second: 'numeric',
   //   hour12: false,
   timeZone: 'Europe/Moscow'
});

//Дни недели в weather-template
const today = new Date();
const dataWeek = formatter.format(today);
const dayWeekFirst = formatter.format(today.setDate(today.getDate() + 1));
const dayWeekSecond = formatter.format(today.setDate(today.getDate() + 1));
const dayWeekThird = formatter.format(today.setDate(today.getDate() + 1));

console.log(dataWeek);
console.log(dayWeekFirst);
console.log(dayWeekSecond);
console.log(dayWeekThird);

//Дата в header с днем недели
const dateHeader = document.querySelector('.header__today');
dateHeader.textContent = new Date().toLocaleDateString() + ', ' + dataWeek.charAt(0).toUpperCase() + dataWeek.slice(1);


/*---------------------------------API Weather-app------------------------------------------- */
const apiKey = '6ef6af6313b24837877152925240703';
const inputCity = document.getElementById('weatherInput');
let city;

const weatherData = {
   temperature: document.querySelector('.weather__temperature'),
   description: document.querySelector('.weather__description'),
   region: document.querySelector('.weather__region'),
   feelslike: document.getElementById('fillsLike'),
   uv: document.getElementById('uv'),
   humidity: document.getElementById('humidity'),
   windSpeed: document.getElementById('windSpeed'),
   sunrise: document.getElementById('sunrise'),
   sunset: document.getElementById('sunset'),
}

const weatherWeek = {
   dayFirst: document.getElementById('dayWeekFirst'),
   daySecond: document.getElementById('dayWeekSecond'),
   dayThird: document.getElementById('dayWeekThird'),
   degreeDayWeeks: document.getElementById('.weather__weekly-item-degree'),
}


const fetchData = async () => {
   const linkApiCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`
   const result = await fetch(`${linkApiCurrent}&q=${city}`);
   const data = await result.json();

   weatherData.region.textContent = data.location.country;
   weatherData.temperature.textContent = `${data.current.temp_c}°`;
   weatherData.description.textContent = data.current.condition.text;
   weatherData.feelslike.textContent = data.current.feelslike_c;
   weatherData.uv.textContent = data.current.uv;
   weatherData.humidity.textContent = `${data.current.humidity}%`;
   weatherData.windSpeed.textContent = data.current.wind_kph;

   console.log(data);
}


const getWeatherWeeks = async () => {
   const linkApiForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}`
   const result = await fetch(`${linkApiForecast}&q=${city}&days=7`);
   const data = await result.json();

   weatherData.sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;
   weatherData.sunset.textContent = data.forecast.forecastday[0].astro.sunset;

   console.log(data);

}

function putDayWeeks() {
   weatherWeek.dayFirst.textContent = dayWeekFirst.charAt(0).toUpperCase() + dayWeekFirst.slice(1);
   weatherWeek.daySecond.textContent = dayWeekSecond.charAt(0).toUpperCase() + dayWeekSecond.slice(1);
   weatherWeek.dayThird.textContent = dayWeekThird.charAt(0).toUpperCase() + dayWeekThird.slice(1);
}


/*--------------------------------- Popup weather city search ------------------------------------------- */

const btnSearchCity = document.querySelector('.weather__edit-btn');
const popupSearchCity = document.querySelector('.popup-city');
const formSearchCity = document.forms.popupSearchForm;
const inputSearchCity = formSearchCity.elements.inputSearch;
const titleWeatherCity = document.querySelector('.weather__city');
//console.log(inputSearchCity);

btnSearchCity.addEventListener('click', () => {
   openPopup(popupSearchCity);
   inputSearchCity.value = titleWeatherCity.textContent.trim();
})

formSearchCity.addEventListener('submit', function (evt) {
   evt.preventDefault();

   titleWeatherCity.textContent = inputSearchCity.value.trim();
   closePopup(popupSearchCity);
   city = inputCity.value.trim();
   fetchData();
   getWeatherWeeks();
   putDayWeeks();
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


   if (e.currentTarget.id === 'weather') {
      openPopup(popupSearchCity);
      getTabPanel(id).hidden = false;
   } else {
      getTabPanel(id).hidden = false;
   }
}

// слушатель для всех кнопок aside
btnAsideAll.forEach((item) => {

   item.addEventListener('click', handleAsideClick)
})

// const btnWeather = document.getElementById('weather');
// btnWeather.addEventListener('click', openPopup(popupSearchCity));



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