import {inputAbout, inputProfileName, submitBtnSelector} from "./constants";

export //заполняет попап редактирования профайла из профиля
function fillProfilePopup(data) {
    inputProfileName.value = data.name;
    inputAbout.value = data.about;
}

export //меняет надпись на кнопке сабмита при загрузке
function renderLoading(popupSelector, isLoading) {
    const submitBtn = document.querySelector(popupSelector).querySelector(submitBtnSelector)
    if (isLoading) {
        submitBtn.textContent = 'Сохранение...'
    } else {
        submitBtn.textContent = 'Сохранить'
    }
}