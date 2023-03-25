//функции отправки запросов на сервер
export function dislikeRequest(id) {
  return fetch(`https://nomoreparties.co/v1/wbf-cohort-6/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  }).then(checkResponse);
}
export function likeRequest(id) {
  return fetch(`https://nomoreparties.co/v1/wbf-cohort-6/cards/likes/${id}`, {
    method: "put",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  }).then(checkResponse);
}
export function deleteRequest(cardDelete) {
  return fetch(`https://nomoreparties.co/v1/wbf-cohort-6/cards/${cardDelete}`, {
    method: "DELETE",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  }).then(checkResponse);
}
export function createCardRequest(inputNamePlace, inputUrlPlace) {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-6/cards", {
    method: "POST",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputNamePlace.value,
      link: inputUrlPlace.value,
    }),
  }).then(checkResponse);
}
export function saveProfileRequest(inputName, inputJob) {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-6/users/me", {
    method: "PATCH",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName.value,
      about: inputJob.value,
    }),
  }).then(checkResponse);
}
export function updateAvatarRequest(inputAvatar) {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-6/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: inputAvatar.value,
    }),
  }).then(checkResponse);
}
export function getCardsRequest() {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-6/cards", {
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  }).then(checkResponse);
}
export function getUserRequest() {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-6/users/me", {
    headers: {
      authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    },
  }).then(checkResponse);
}

//Функция обработчик ответа от сервера
function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((errorData) => {
      console.error("Ошибка HTTP: " + response.status, errorData);
    });
  }
  return response.json();
}
