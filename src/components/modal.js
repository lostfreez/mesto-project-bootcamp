//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const popupAvatar = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__avatar");
//Константы профиля
const displayName = document.querySelector(".profile__name");
const displayJob = document.querySelector(".profile__job");
//Поля ввода
const inputName = document.getElementById("name-input");
const inputJob = document.getElementById("job-input");
const inputAvatar = document.getElementById("avatar-input");

//функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeByClickBackground);
}
//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", closeByClickBackground);
}
//Функция колбэк для закрытия модального окна с кнопки
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
//Проверка клика вне контейнера
function closeByClickBackground(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
//функция сохранения формы profile
function saveProfile(event) {
  event.preventDefault();
  renderLoading(event, true, "Сохранить", "Cохранение...");
  saveProfileRequest(inputName, inputJob)
    .then((response) => {
      displayName.textContent = response.name;
      displayJob.textContent = response.about;
      renderLoading(event, false, "Сохранить", "Cохранение...");
      closePopup(profile);
    })
    .catch((error) => {
      renderLoading(event, false, "Сохранить", "Cохранение...");
      console.error("Ошибка запроса:", error);
    });
}
//функция обновления аватарки
function updateAvatar(evt) {
  evt.preventDefault();
  renderLoading(evt, true, "Сохранить", "Cохранение...");
  updateAvatarRequest(inputAvatar)
    .then((response) => {
      renderLoading(evt, false, "Сохранить", "Cохранение...");
      profileAvatar.src = response.avatar;
      evt.target.reset();
      validateForm(popupAvatar);
      closePopup(popupAvatar);
    })
    .catch((error) => {
      renderLoading(evt, false, "Сохранить", "Cохранение...");
      console.error("Ошибка запроса:", error);
    });
}

//функция копирования текущего name и job в поля ввода
function showInputs() {
  inputName.value = displayName.textContent;
  inputJob.value = displayJob.textContent;
}
import { saveProfileRequest, updateAvatarRequest } from "./api";
import { renderLoading } from "./utils";
import { validateForm } from "./validate";
//экспорт
export { closePopup, openPopup, showInputs, saveProfile, updateAvatar };
