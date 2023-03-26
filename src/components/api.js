//конфиг с адресом и токеном
const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-6/",
  headers: {
    authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
    "Content-Type": "application/json",
  },
};
//функции запросов на сервер
export function dislikeRequest(id) {
  return fetch(`${config.baseUrl}cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function likeRequest(id) {
  return fetch(`${config.baseUrl}cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function deleteRequest(cardDelete) {
  return fetch(`${config.baseUrl}cards/${cardDelete}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function createCardRequest(inputNamePlace, inputUrlPlace) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputNamePlace.value,
      link: inputUrlPlace.value,
    }),
  }).then(checkResponse);
}

export function saveProfileRequest(inputName, inputJob) {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: inputName.value,
      about: inputJob.value,
    }),
  }).then(checkResponse);
}

export function updateAvatarRequest(inputAvatar) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatar.value,
    }),
  }).then(checkResponse);
}

export function getCardsRequest() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function getUserRequest() {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}
//универсальная функция обработчик запросов от сервера
function checkResponse(response) {
  if (!response.ok) {
    return response.json().then((errorData) => {
      console.error("Ошибка HTTP: " + response.status, errorData);
    });
  }
  return response.json();
}
