//константы
const popup = document.querySelector(".popup");
const nameOutput = document.querySelector(".profile__name");
const jobOutput = document.querySelector(".profile__job");
const nameCardInput = document.getElementById("newPlace");
const urlCardInput = document.getElementById("urlPlace");
const cardPopup = document.querySelector("#popup__card");
const cardContainer = document.querySelector(".photo-grid__list");


//функция для сохраненения изменений в профиле из popup editForm
function saveProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameOutput.textContent = nameValue;
  jobOutput.textContent = jobValue;
  closePopup();
}
//функция добавления новой карточки из popup addForm
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

import { giveId } from "./utils";
import {validateForm, resetError} from "./validate";
export {closePopup, openPopup, addCard, saveProfile}