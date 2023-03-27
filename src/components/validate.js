const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.error);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.error);
  errorElement.textContent = "";
};
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};
function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.form));
  forms.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const button = formElement.querySelector(settings.button);
  toggleButtonState(inputList, button, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, button, settings);
    });
  });
};
function validateForm(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const button = formElement.querySelector(settings.button);
  toggleButtonState(inputList, button, settings);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.disabled);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settings.disabled);
    buttonElement.removeAttribute("disabled");
  }
}

export { enableValidation, validateForm };
