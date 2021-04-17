import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from "./ImagePopup"
import PopupWithForm from './PopupWithForm'


function App() {
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setAvatarPopupOpen(false)
        setProfilePopupOpen(false)
        setPlacePopupOpen(false)
        setSelectedCard(null)
    }

    return (
        <div className="App">
            <div className="page__container">
                <Header/>
                <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
                <Footer/>

                {/*попап редактирования аватара*/}
                <PopupWithForm isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''} onClose={closeAllPopups}
                               name='avatar' title='Обновить аватар'>
                    <fieldset className="popup__input-field">
                        <input id="avatar" className="popup__input popup__input_type_avatar" type="url" name="avatar"
                               placeholder="Ссылка на изображение"
                               required/>
                        <span className="popup__input-error avatar-error"></span>
                    </fieldset>
                </PopupWithForm>

                {/*попап редактирования профайла*/}
                <PopupWithForm isOpen={isEditProfilePopupOpen && 'popup_opened'} onClose={closeAllPopups}
                               name='edit-profile'
                               title='Редактировать профиль'>
                    <fieldset className="popup__input-field">
                        <input id="profile-name" className="popup__input popup__input_type_name" type="text" name="name"
                               placeholder="Имя"
                               minLength="2" maxLength="40"
                               required/>
                        <span className="popup__input-error profile-name-error"></span>
                        <input id="about" className="popup__input popup__input_type_about" type="text" name="about"
                               placeholder="О себе"
                               minLength="2" maxLength="200"
                               required/>
                        <span className="popup__input-error about-error"></span>
                    </fieldset>
                </PopupWithForm>

                {/*попап добавления карточек*/}
                <PopupWithForm isOpen={isAddPlacePopupOpen && 'popup_opened'} onClose={closeAllPopups} name='add-card'
                               title='Новое место'>
                    <fieldset className="popup__input-field">
                        <input id="place-name" className="popup__input popup__input_type_place" type="text" name="name"
                               placeholder="Название"
                               minLength="2" maxLength="30"
                               required/>
                        <span className="popup__input-error place-name-error"></span>
                        <input id="link" className="popup__input popup__input_type_url" type="url" name="link"
                               placeholder="Ссылка на картинку"
                               required/>
                        <span className="popup__input-error link-error"></span>
                    </fieldset>
                </PopupWithForm>

                {/*попап с картинкой*/}
                <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                {/*{попап подтверждения}*/}
                <PopupWithForm name='card-delete' title='Вы уверены?'/>
            </div>
        </div>
    )
}

export default App;
