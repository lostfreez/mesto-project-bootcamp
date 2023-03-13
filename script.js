//Переменные кнопок popup
const buttonAddCard = document.querySelector(".profile__button");
const buttonOpenProfile = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const profileForm = document.getElementById("profileForm");
const cardForm = document.getElementById("cardForm");
//Обработчики кнопок popup
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
});
popup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup();
  }
});
popup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup();
  }
});
buttonOpenProfile.addEventListener("click", () => {
  openPopup(profileForm);
});
buttonAddCard.addEventListener("click", () => {
  openPopup(cardForm);
});
// обработчик для закрытия popup карточек
popup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup();
  }
});
//универсальная функция открытия popup
function openPopup(form) {
  const element = form.target;
  if (element) {
    const container = element.closest(".photo-grid__card");
    const popupContainer = document.getElementById("popup" + container.id);
    cardPopupContainer.classList.add("popup_opened");
    popupContainer.classList.add("popup_opened");
    popup.classList.add("popup_background_opened");
  } else {
    form.classList.add("popup_opened");
    popup.classList.add("popup_opened");
    if (form === profileForm) {
      nameInput.value = nameOutput.textContent;
      jobInput.value = jobOutput.textContent;
    }
    validateForm(form);
    resetError();
  }
}
//универсальная функция закрытия popup
function closePopup() {
  popup.classList.remove("popup_opened");
  popup.classList.remove("popup_background_opened");
  const popups = document.querySelectorAll(".popup__container");
  const popupsCards = document.querySelectorAll(".popup__card");
  popups.forEach((item) => {
    item.classList.remove("popup_opened");
  });
  popupsCards.forEach((item) => {
    item.classList.remove("popup_opened");
  });
}
//массив с карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//переменные template для клонирования карточки
const card = document.querySelector("#card");
const cardPopup = document.querySelector("#popup__card");
const cardPopupContainer = document.getElementById("cardPopupContainer");
const cardContainer = document.querySelector(".photo-grid__list");
//обработчик контейнейра с карточками на открытие попапа
cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("photo-grid__image")) {
    openPopup(evt);
  }
});
//обработчик контейнейра с карточками на удаление карточек
cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("photo-grid__delete")) {
    deleteImage(evt);
  }
});
//обработчик контейнейра с карточками на постановку лайка
cardContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("photo-grid__like")) {
    likeImage(evt);
  }
});
//функция клонирующая карточки с изменением содержимого из массива
initialCards.forEach(function (item) {
  const cardContent = card.content.cloneNode(true);
  const cardContentPopup = cardPopup.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = item.link;
  cardContent.querySelector(".photo-grid__city").textContent = item.name;
  cardContentPopup.querySelector(".popup__image").src = item.link;
  cardContentPopup.querySelector(".popup__place-name").textContent = item.name;
  giveId(cardContent, cardContentPopup); //присваиваем каждой карточке уникальный id
  cardContainer.prepend(cardContent);
  cardPopupContainer.prepend(cardContentPopup);
});
//Функция присваивания каждой карточке уникального идентификатора одинаковый для popup и list
function giveId(cardContent, cardContentPopup) {
  const cardId = cardContent.querySelector(".photo-grid__card");
  const cardIdPopup = cardContentPopup.querySelector(".popup__card");
  const FirstCard = document.querySelectorAll(".photo-grid__card");
  let cardCount = 0;
  if (FirstCard.length === 0) {
    cardCount++;
  } else {
    cardCount = Number(FirstCard[0].getAttribute("id"));
    cardCount++;
  }
  cardId.setAttribute("id", cardCount.toString());
  cardIdPopup.setAttribute("id", "popup" + cardCount);
}
//Функция удаления карточки
function deleteImage(evt) {
  const element = evt.target;
  const card = element.closest(".photo-grid__card");
  const cardPopup = document.getElementById("popup" + card.id);
  card.remove();
  cardPopup.remove();
}
//функция постановки лайка
function likeImage(evt) {
  const element = evt.target;
  element.classList.toggle("photo-grid__like_active");
}
//переменные для добавления новой карточки
const nameCardInput = document.getElementById("newPlace");
const urlCardInput = document.getElementById("urlPlace");
const formAddCard = document.getElementById("addCard");
//Обработчик submit для добавления новой карты
formAddCard.addEventListener("submit", addCard);
//функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();
  const nameValue = nameCardInput.value;
  const placeValue = urlCardInput.value;
  const cardContent = card.content.cloneNode(true);
  const cardContentPopup = cardPopup.content.cloneNode(true);
  cardContent.querySelector(".photo-grid__image").src = placeValue;
  cardContent.querySelector(".photo-grid__city").textContent = nameValue;
  cardContentPopup.querySelector(".popup__image").src = placeValue;
  cardContentPopup.querySelector(".popup__place-name").textContent = nameValue;
  giveId(cardContent, cardContentPopup);
  cardContainer.prepend(cardContent);
  cardPopupContainer.prepend(cardContentPopup);
  nameCardInput.value = "";
  urlCardInput.value = "";
  closePopup();
}
//переменные для редактирование профиля
const formEditContain = document.getElementById("editContainer");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const nameOutput = document.querySelector(".profile__name");
const jobOutput = document.querySelector(".profile__job");
const profileSaveBtn = document.getElementById("save__profile");
//слушатель валидации
nameInput.addEventListener("input", () => {
  validateInput(nameInput, formEditContain);
});
jobInput.addEventListener("input", () => {
  validateInput(jobInput, formEditContain);
});
nameCardInput.addEventListener("input", () => {
  validateInput(nameCardInput, formAddCard);
});
urlCardInput.addEventListener("input", () => {
  validateInput(urlCardInput, formAddCard);
});
//функция валидации поля
function validateInput(elementForm, cardForm) {
  if (!elementForm.validity.valid) {
    elementForm.classList.add("popup__edit_error");
    elementForm.nextElementSibling.textContent = elementForm.validationMessage;
  }
  if (elementForm.validity.valid) {
    elementForm.nextElementSibling.textContent = "";
    elementForm.classList.remove("popup__edit_error");
  }
  validateForm(cardForm);
}
//функция валидации формы
function validateForm(form) {
  const saveButtonn = form.querySelector(".popup__save");
  const formInputs = Array.from(form.querySelectorAll(".popup__edit"));
  const input = (element) => element.validity.valid;
  if (formInputs.every(input)) {
    saveButtonn.classList.remove("popup__save_disabled");
    saveButtonn.removeAttribute("disabled");
  } else {
    saveButtonn.classList.add("popup__save_disabled");
    saveButtonn.setAttribute("disabled", true);
  }
}
//функция для сохраненния внесенных изменений и скрытия попапа
function saveProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameOutput.textContent = nameValue;
  jobOutput.textContent = jobValue;
  closePopup();
}
//Обработчик submit для редактирования профиля
formEditContain.addEventListener("submit", saveProfile);
//функция удаления ошибок
function resetError(){
  const inputs = document.querySelectorAll('.popup__error-container');
  inputs.forEach((item) => {
    item.textContent = "";
    item.previousElementSibling.classList.remove("popup__edit_error");
  });
}