import React from "react";

function Card(props){

    // function handleClick() {
    //     props.onCardClick(props.card);
    // }

    return (
        <li className="card">
            <div className="card__image" style={{ backgroundImage: `url(${props.link})` }}></div>
            <div className="card__caption">
                <h2 className="card__title">{props.title}</h2>
                <div className="card__like-group">
                    <button className="card__like" type="button" aria-label="поставить лайк"></button>
                    <p className="card__like-counter">{props.like}</p>
                </div>
            </div>
            <button className="card__delete" type="button" aria-label="удалить карточку"></button>
        </li>
    )
}

export default Card