function ImagePopup(props){
    return(
        <div className={`popup popup_for_image ${props.card && 'popup_opened'}`}>
            <figure className="popup__figure">
                <img className="popup__image"
                     src={props.card.link}
                     alt="изображение для модального окна"/>
                <figcaption className="popup__figcaption">{props.card.name}</figcaption>
                <button onClick={props.onClose} className="popup__close" type="button" aria-label="закрыть окно"></button>
            </figure>
        </div>
    )
}
export default ImagePopup