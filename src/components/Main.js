import React from 'react'
import avatarBtn from '../images/Avatar_button.svg'
import Avatar from '../images/Avatar.jpg'
import Card from "./Card";
import api from '../utils/api'

function Main(props) {
    const {onEditAvatar,onAddPlace, onEditProfile,onCardClick} = props;
    const [userName, setUserName] = React.useState('Жак-Ив Кусто')
    const [userDescription, setUserDescription] = React.useState('Исследователь океана')
    const [userAvatar, setUserAvatar] = React.useState(Avatar)
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInitialProfile()
            .then(res => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            })
            .catch((err) => console.log(err))

        api.getInitialCards()
            .then(res => {
                setCards(res)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-block">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-button" type="button" aria-label="изменить аватар"
                            onClick={onEditAvatar}>
                        <img className="profile__avatar-svg" src={avatarBtn}
                             alt="значок редактирования"/>
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" aria-label="изменить профайл"
                            onClick={onEditProfile}></button>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить карточку"
                        onClick={onAddPlace}></button>
            </section>
            <ul className="cards">
                {cards.map(card => (
                    <div key={card._id}>
                        <Card card={card} onCardClick={onCardClick}/>
                    </div>
                ))}
            </ul>
        </main>
    )
}

export default Main