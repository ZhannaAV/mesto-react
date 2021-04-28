import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from "./ImagePopup"
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from '../utils/api'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";


function App() {
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})

    React.useEffect(() => {
        api.getInitialProfile()
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err))
    }, [])


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

    function handleUpdateUser({name, about}) {
        api.changeInfoProfile({name, about})
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err))
        setProfilePopupOpen(false)
    }

    function handleUpdateAvatar({avatar}) {
        api.changeAvatarProfile({avatar})
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err))
        setAvatarPopupOpen(false)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page__container">
                    <Header/>
                    <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
                    <Footer/>

                    {/*попап редактирования аватара*/}
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

                    {/*попап редактирования профайла*/}
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>

                    {/*попап добавления карточек*/}
                    <PopupWithForm isOpen={isAddPlacePopupOpen && 'popup_opened'} onClose={closeAllPopups}
                                   name='add-card'
                                   title='Новое место'>
                        <fieldset className="popup__input-field">
                            <input id="place-name" className="popup__input popup__input_type_place" type="text"
                                   name="name"
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
        </CurrentUserContext.Provider>
    )
}

export default App;
