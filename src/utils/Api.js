import {baseUrl, personalData} from "./constants";

class Api {
    constructor(baseUrl, personalData) {
        this._baseUrl = baseUrl;
        this._cohortId = personalData.cohortId;
        this._token = personalData.token
    }

//возвращает массив со всеми данными профиля с сервера
    getInitialProfile() {
        return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

//меняет данные профайла на сервере и возвращает все данные профиля
    changeInfoProfile({name, about}) {
        return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    //меняет данные профайла на сервере и возвращает все данные профиля
    changeAvatarProfile({avatar}) {
        return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

//возвращает массив со всеми данными профиля с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
            headers: {
                authorization: `${this._token}`,
            }
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    //добавляет карточку на сервер и возвращает ответ
    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    //удаляет карточку
    deleteCard(cardID, element) {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    element.closest('.card').remove();
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

//плюс лайк
    setLikeCard(cardId) {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

//минус лайк
    removeLikeCard(cardId) {
        return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            }
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}

const api = new Api(baseUrl, personalData);
export default api
