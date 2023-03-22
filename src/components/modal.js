//Константы страницы
const profile = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_image");
const popupImage = cardPopup.querySelector(".popup__card")
const popups = document.querySelectorAll(".popup");
//Константы профиля
const displayName = document.querySelector(".profile__name");
const displayJob = document.querySelector(".profile__job");
//Константы карточки
const displayPlace = cardPopup.querySelector(".popup__place-name");
const displayImage = cardPopup.querySelector(".popup__image");
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
  const image = form.target;
  if (image) {
    openImage(image);
  } else {
    form.classList.add("popup_opened");
    form.querySelector(".popup__container").classList.add("popup_opened");
  }
  document.addEventListener("keydown", closeByEsc);
}
//Функция открытия изображения
function openImage(image){
  const card = image.closest(".photo-grid__card");
  const place = card.querySelector(".photo-grid__city");
  displayPlace.textContent = place.textContent;
  displayImage.src = image.src;
  cardPopup.classList.add("popup_background_opened");
  popupImage.classList.add("popup_opened");
}
//функция закрытия popup
function closePopup() {
  const popupsArray = document.querySelectorAll(".popup");
  popupsArray.forEach(function (item) {
    item.classList.remove("popup_opened");
    item.classList.remove("popup_background_opened");
    item.firstElementChild.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEsc);
  });
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
