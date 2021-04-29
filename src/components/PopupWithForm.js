import React from 'react'

function PopupWithForm(props) {
    const {name, isOpen,onSubmit, title, children, onClose, btnText} = props
    return (
        <div className={`popup popup_for_${name} ${isOpen}`}>
            <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit}>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button className="popup__submit-button" type="submit">{btnText}</button>
                <button className="popup__close" type="button" aria-label="закрыть окно"
                        onClick={onClose}></button>
            </form>
        </div>
    )
}

export default PopupWithForm