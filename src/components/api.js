const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const avatar = document.querySelector('.profile__avatar');
let userData;
let cards;
//Получение данных пользователя
function getDataProfile() {
   fetch('https://nomoreparties.co/v1/wbf-cohort-6/users/me', {
    headers: {
      authorization: '54974c2d-ab71-4b56-9932-c842ca70e522'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      userData = data;
    })
    .then(() => {
        insertDataProfile();
        displayInputs();
      })
    .catch(error => {
      console.error('Ошибка в функции getDataProfile:', error);
    });
}
//получение данных карточек
function getDataCards() {
     fetch('https://nomoreparties.co/v1/wbf-cohort-6/cards', {
      headers: {
        authorization: '54974c2d-ab71-4b56-9932-c842ca70e522'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка получения данных: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        cards = data;
      })
      .then(() => {
        addCardsFromData(cards);
      })
      .catch(error => {
        console.error('Ошибка в функции getDataProfile:', error);
      });
  }
//Встраивание данных пользователя на страницу
function insertDataProfile(){
    name.textContent = userData.name;
    job.textContent = userData.about;
    avatar.src = userData.avatar;
}

import { addCardsFromData } from "./card"
import { displayInputs } from "./modal"
export { getDataProfile, getDataCards }