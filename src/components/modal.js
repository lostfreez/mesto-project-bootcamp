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
//функция выхода из фонового модального окна
function enableBackgroundClose() {
  const openedPopup = document.querySelector(".popup_opened");
  openedPopup.addEventListener("click", closeByClickBackground);
}
//Проверка клика вне контейнера
function closeByClickBackground(event) {
  if (event.target.classList.contains("popup_opened")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
//функция открытия popup
function openPopup(form) {
  form.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  enableBackgroundClose();
}
//функция закрытия popup
function closePopup(form) {
  form.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  form.removeEventListener("click", closeByClickBackground);
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
  renderLoading(true);
  saveProfileRequest(inputName, inputJob)
    .then((response) => {
      displayName.textContent = response.name;
      displayJob.textContent = response.about;
      renderLoading(false);
      closePopup(profile);
    })
    .catch((error) => {
      renderLoading(false);
      console.error("Ошибка запроса:", error);
    });
}
//функция обновления аватарки
function updateAvatar(e) {
  e.preventDefault();
  renderLoading(true);
  updateAvatarRequest(inputAvatar)
    .then((response) => {
      profileAvatar.src = response.avatar;
      inputAvatar.value = "";
      renderLoading(false);
      closePopup(popupAvatar);
      validateForm(popupAvatar);
    })
    .catch((error) => {
      renderLoading(false);
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
export {
  enableBackgroundClose,
  closePopup,
  openPopup,
  showInputs,
  saveProfile,
  updateAvatar,
};
