//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const popups = document.querySelectorAll(".popup");
//Константы профиля
const displayName = document.querySelector(".profile__name");
const displayJob = document.querySelector(".profile__job");
//Поля ввода
const inputName = document.getElementById("name-input");
const inputJob = document.getElementById("job-input");
//функция выходы из фонового модального окна
function enableButtons() {
  //навешиваем слушатели на фон попапа для функции закрытия
  popups.forEach((background) => {
    background.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup")) {
        closePopup();
      }
    });
  });
}
//функция открытия popup
function openPopup(form) {
  form.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}
//функция закрытия popup
function closePopup(form) {
  form.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}
//Функция колбэк для закрытия модального окна с кнопки
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//функция сохранения формы profile
function saveProfile(event) {
  event.preventDefault();
  const nameValue = inputName.value;
  const jobValue = inputJob.value;
  displayName.textContent = nameValue;
  displayJob.textContent = jobValue;
  closePopup(profile);
}
//функция копирования текущего name и job в поля ввода
function displayInputs() {
  inputName.value = displayName.textContent;
  inputJob.value = displayJob.textContent;
}
//экспорт
export { enableButtons, closePopup, openPopup, displayInputs, saveProfile };
