import AvatarBtn from '../images/Avatar_button.svg'
import Avatar from '../images/Avatar.jpg'
import React from 'react'
import Card from "./Card";
import api from '../utils/Api'

function Main(props) {
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
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCards(res)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-block">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя"/>
                    <button className="profile__avatar-button" type="button" aria-label="изменить аватар"
                            onClick={props.onEditAvatar}>
                        <img className="profile__avatar-svg" src={AvatarBtn}
                             alt="значок редактирования"/>
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" aria-label="изменить профайл"
                            onClick={props.onEditProfile}></button>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить карточку"
                        onClick={props.onAddPlace}></button>
            </section>
            <ul className="cards">
                {cards.map(card => (
                    <div key={card._id}>
                        <Card card={card} onCardClick={props.onCardClick}/>
                    </div>
                ))}
            </ul>
        </main>
    )
}

export default Main