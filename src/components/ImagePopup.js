function ImagePopup(){
    return(
        <div className="popup popup_for_image">
            <figure className="popup__figure">
                <img className="popup__image"
                     src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
                     alt="изображение для модального окна"/>
                <figcaption className="popup__figcaption">Камчатка</figcaption>
                <button className="popup__close" type="button" aria-label="закрыть окно"></button>
            </figure>
        </div>
    )
}
export default ImagePopup