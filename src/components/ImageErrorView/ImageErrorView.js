import errorImage from './sadcat.jpg';
import css from './ImageErrorView.module.css'


export default function ImageErrorView({message}) {
    return (
        <div role="alert">
            <img
                className={css.imageError}
                src={errorImage}
                alt={message} />
            <span>{message}</span>
        </div>
    )
}

