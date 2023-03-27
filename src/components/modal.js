export const profileAvatar = document.querySelector(".profile__avatar");
export const displayName = document.querySelector(".profile__name");
export const displayJob = document.querySelector(".profile__job");
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
    closePopup(evt.target);
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
      closePopup(popupProfile);
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    })
    .finally(() => {
      renderLoading(event, false, "Сохранить", "Cохранение...");
    });
}
//функция обновления аватарки
function updateAvatar(evt) {
  evt.preventDefault();
  renderLoading(evt, true, "Сохранить", "Cохранение...");
  updateAvatarRequest(inputAvatar)
    .then((response) => {
      profileAvatar.src = response.avatar;
      evt.target.reset();
      validateForm(popupAvatar, settings);
      closePopup(popupAvatar);
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    })
    .finally(() => {
      renderLoading(evt, false, "Сохранить", "Cохранение...");
    });
}

//функция копирования текущего name и job в поля ввода
function fillProfileInputs() {
  inputName.value = displayName.textContent;
  inputJob.value = displayJob.textContent;
}
import { popupProfile, popupAvatar, settings } from "../index";
import { saveProfileRequest, updateAvatarRequest } from "./api";
import { renderLoading } from "./utils";
import { validateForm } from "./validate";
//экспорт
export { closePopup, openPopup, fillProfileInputs, saveProfile, updateAvatar };
