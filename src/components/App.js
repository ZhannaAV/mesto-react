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
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [isLoad, setIsLoad] = React.useState(false)
    let loadTextBtn = isLoad ? 'Сохранение..' : 'Сохранить'

    React.useEffect(() => {
        api.getInitialProfile()
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err))
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => setCards(res))
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
        setIsLoad(true)
        api.changeInfoProfile({name, about})
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err))
            .finally(() => setIsLoad(false))
        setProfilePopupOpen(false)
    }

    function handleUpdateAvatar({avatar}) {
        setIsLoad(true)
        api.changeAvatarProfile({avatar})
            .then(res => setCurrentUser(res))
            .catch((err) => console.log(err))
        setAvatarPopupOpen(false)
            .finally(() => setIsLoad(false))
    }

    //обновляет стейт карточек после полож. ответа api об изм лайка
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
    }

//меняет стейт карточек, если пришел полож ответ с сервера об удал карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((c) => card._id !== c._id))
            })
            .catch((err) => console.log(err))
    }

    //добавляет карточки
    function handleAddPlaceSubmit({name, link}) {
        setIsLoad(true)
        api.postNewCard({name, link})
            .then(res => setCards([res, ...cards]))
            .catch((err) => console.log(err))
            .finally(() => setIsLoad(false))
        setPlacePopupOpen(false)
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page__container">
                    <Header/>
                    <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete} cards={cards}/>
                    <Footer/>

                    {/*попап редактирования аватара*/}
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar} btnText={loadTextBtn}/>

                    {/*попап редактирования профайла*/}
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser} btnText={loadTextBtn}/>

                    {/*попап добавления карточек*/}
                    <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen}
                                   onClose={closeAllPopups} btnText={loadTextBtn}/>

                    {/*попап с картинкой*/}
                    <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                    {/*{попап подтверждения}*/}
                    <PopupWithForm name='card-delete' title='Вы уверены?' btnText={'Да'}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
