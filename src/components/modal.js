//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popups = document.querySelectorAll(".popup");
const profileAvatar = document.querySelector(".profile__avatar");
//Константы профиля
const displayName = document.querySelector(".profile__name");
const displayJob = document.querySelector(".profile__job");
//Поля ввода
const inputName = document.getElementById("name-input");
const inputJob = document.getElementById("job-input");
const inputAvatar = document.getElementById("avatar-input");
//функция выходы из фонового модального окна
function enableBackgroundClose() {
  //навешиваем слушатели на фон попапа для функции закрытия
  popups.forEach((background) => {
    background.addEventListener("click", function (event) {
      if (event.target.classList.contains("popup")) {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
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
  renderLoading(true);
  const nameValue = inputName.value;
  const jobValue = inputJob.value;

  // отправляем данные на сервер
  fetch("https://nomoreparties.co/v1/wbf-cohort-6/users/me", {
    method: "PATCH",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName.value,
      about: inputJob.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // обновляем элементы на странице после успешного сохранения на сервере
        displayName.textContent = nameValue;
        displayJob.textContent = jobValue;
      } else {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    })
    .finally(() => {
      renderLoading(false);
      closePopup(profile);
    });
}
//функция обновления аватарки
function updateAvatar(e) {
  e.preventDefault();
  renderLoading(true);
  console.log(inputAvatar.value);
  fetch("https://nomoreparties.co/v1/wbf-cohort-6/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: inputAvatar.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // обновляем элементы на странице после успешного сохранения на сервере
        profileAvatar.link = inputAvatar.value;
        inputAvatar.value = "";
      } else {
        response.json().then((errorData) => {
          console.error("Ошибка HTTP: " + response.status, errorData);
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    })
    .finally(() => {
      renderLoading(false);
      closePopup(popupAvatar);
      enableValidation();
    });
}

//функция копирования текущего name и job в поля ввода
function displayInputs() {
  inputName.value = displayName.textContent;
  inputJob.value = displayJob.textContent;
}
import { renderLoading } from "./utils"
import { enableValidation } from "./validate";
//экспорт
export {
  enableBackgroundClose,
  closePopup,
  openPopup,
  displayInputs,
  saveProfile,
  updateAvatar,
};
