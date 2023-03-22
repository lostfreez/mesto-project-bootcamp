//импортируем стили css
import "./pages/index.css"
//Подключаем кнопки модальных окон и форм
enableButtons();
//загружаем на страницу стандартный набор карточек
addCardsDefault();
//Подключение валидации полей
enableValidation();
//Подгружаем данные профиля в поля ввода
displayInputs();

import {addCardsDefault} from "./components/card"
import {enableButtons, displayInputs} from "./components/popup"
import {enableValidation} from "./components/validate"