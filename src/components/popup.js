//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const card = document.querySelector(".popup_type_card-form");
const cardPopup = document.querySelector(".popup_type_image");
const cardContainer = document.querySelector(".photo-grid__list");
//Константы профиля
const displayName = document.querySelector(".profile__name");
const displayJob = document.querySelector(".profile__job");
//Константы карточки
const displayPlace = cardPopup.querySelector(".popup__place-name");
const displayImage = cardPopup.querySelector(".popup__image");
//Кнопки
const buttonSaveProfile = profile.querySelector(".popup__save");
const buttonCloseProfile = profile.querySelector(".popup__close");
const buttonCloseCard = card.querySelector(".popup__close");
const buttonOpenProfile = document.querySelector(".profile__edit");
const buttonOpenCardForm = document.querySelector(".profile__button");
const buttonClosePopupImage = cardPopup.querySelector(".popup__close");
//Поля ввода
const inputName = document.getElementById("name");
const inputJob = document.getElementById("job");
//Подключаем обработчики кнопок открытия/закрытия
function enableButtons() {
  cardContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("photo-grid__image")) {
      openPopup(event);
    }
  });
  buttonOpenProfile.addEventListener("click", () => {
    openPopup(profile);
  });
  buttonOpenCardForm.addEventListener("click", () => {
    openPopup(card);
  });
  buttonCloseProfile.addEventListener("click", () => {
    closePopup();
  });
  buttonCloseCard.addEventListener("click", () => {
    closePopup();
  });
  buttonClosePopupImage.addEventListener("click", () => {
    closePopup();
  });
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup();
    }
  });
  //Кнопки сохранения формы
  buttonSaveProfile.addEventListener("click", saveProfile);
}
//функция открытия popup
function openPopup(form) {
  const image = form.target;
  if (image) {
    const foot = image.nextElementSibling;
    const place = foot.querySelector(".photo-grid__city");
    displayPlace.textContent = place.textContent;
    displayImage.src = image.src;
    cardPopup.classList.add("popup_background_opened");
    cardPopup.firstElementChild.classList.add("popup_opened");
  } else {
    form.classList.add("popup_opened");
    form.firstElementChild.classList.add("popup_opened");
    //Если открываем профиль - копируем текущее name и job в поля ввода формы и сразу выполняем валидацию полей
    // сброс ошибок при перезагрузке формы
    if (form === profile) {
      displayInputs();
      const inputList = Array.from(form.querySelectorAll(".popup__edit"));
      const button = form.querySelector(".popup__save");
      toggleButtonState(inputList, button);
      inputList.forEach((input) => {
        hideInputError(input);
      });
    }
  }
}
//функция закрытия popup
function closePopup() {
  const popupsArray = document.querySelectorAll(".popup");
  popupsArray.forEach(function (item) {
    item.classList.remove("popup_opened");
    item.classList.remove("popup_background_opened");
    item.firstElementChild.classList.remove("popup_opened");
  });
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
import { toggleButtonState, hideInputError } from "./validate";
export { enableButtons, closePopup };
