import React from 'react'
import avatarBtn from '../images/Avatar_button.svg'
import Card from "./Card";
import api from '../utils/api'
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {
    const {onEditAvatar, onAddPlace, onEditProfile, onCardClick} = props;
    const [cards, setCards] = React.useState([])
    const currentUser = React.useContext(CurrentUserContext)

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

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => setCards(res))
            .catch((err) => console.log(err))
    }, [])


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-block">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-button" type="button" aria-label="изменить аватар"
                            onClick={onEditAvatar}>
                        <img className="profile__avatar-svg" src={avatarBtn}
                             alt="значок редактирования"/>
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="изменить профайл"
                            onClick={onEditProfile}></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить карточку"
                        onClick={onAddPlace}></button>
            </section>
            <ul className="cards">
                {cards.map(card => (
                    <div key={card._id}>
                        <Card card={card} onCardClick={onCardClick} onCardLike={handleCardLike}
                              onCardDelete={handleCardDelete}/>
                    </div>
                ))}
            </ul>
        </main>
    )
}

export default Main