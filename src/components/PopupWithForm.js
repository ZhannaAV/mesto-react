import React from 'react'

function PopupWithForm(props) {
    return (
        <div className={`popup popup_for_${props.name} ${props.isOpen}`}>
            <form className="popup__form" name={`form-${props.name}`} onSubmit={props.onSubmit}>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className="popup__submit-button" type="submit">Сохранить</button>
                <button className="popup__close" type="button" aria-label="закрыть окно"
                        onClick={props.onClose}></button>
            </form>
        </div>
    )
}

export default PopupWithForm