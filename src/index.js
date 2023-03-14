//импортируем стили css
import "./pages/index.css"
//Подключаем кнопки модальных окон
enableButtons();
//инициалзируем функции работу с карточками
enableCardsFuncs();
//загружаем на страницу стандартный набор карточек
addCardsDefault();
//Подключение валидации полей
enableValidation();

import {addCardsDefault, enableCardsFuncs} from "./components/card"
import {enableButtons} from "./components/popup"
import {enableValidation} from "./components/validate"