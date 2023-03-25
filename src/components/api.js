// Создаем константы
const BASE_URL = "https://nomoreparties.co/v1/wbf-cohort-6/";
const HEADERS = {
authorization: "54974c2d-ab71-4b56-9932-c842ca70e522",
"Content-Type": "application/json",
};

// Функции с использованием констант
export function dislikeRequest(id) {
return fetch(`${BASE_URL}cards/likes/${id}`, {
method: "DELETE",
headers: HEADERS,
}).then(checkResponse);
}
export function likeRequest(id) {
return fetch(`${BASE_URL}cards/likes/${id}`, {
method: "PUT",
headers: HEADERS,
}).then(checkResponse);
}
export function deleteRequest(cardDelete) {
return fetch(`${BASE_URL}cards/${cardDelete}`, {
method: "DELETE",
headers: HEADERS,
}).then(checkResponse);
}
export function createCardRequest(inputNamePlace, inputUrlPlace) {
return fetch(`${BASE_URL}cards`, {
method: "POST",
headers: HEADERS,
body: JSON.stringify({
name: inputNamePlace.value,
link: inputUrlPlace.value,
}),
}).then(checkResponse);
}
export function saveProfileRequest(inputName, inputJob) {
return fetch(`${BASE_URL}users/me`, {
method: "PATCH",
headers: HEADERS,
body: JSON.stringify({
name: inputName.value,
about: inputJob.value,
}),
}).then(checkResponse);
}
export function updateAvatarRequest(inputAvatar) {
return fetch(`${BASE_URL}users/me/avatar`, {
method: "PATCH",
headers: HEADERS,
body: JSON.stringify({
avatar: inputAvatar.value,
}),
}).then(checkResponse);
}
export function getCardsRequest() {
return fetch(`${BASE_URL}cards`, {
headers: HEADERS,
}).then(checkResponse);
}
export function getUserRequest() {
return fetch(`${BASE_URL}users/me`, {
headers: HEADERS,
}).then(checkResponse);
}

// Функция обработчик ответа от сервера
function checkResponse(response) {
if (!response.ok) {
return response.json().then((errorData) => {
console.error("Ошибка HTTP: " + response.status, errorData);
});
}
return response.json();
}