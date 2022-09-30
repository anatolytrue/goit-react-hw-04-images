import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ previewImage, alt, onClickImage }) {
    return (
        <li className={css.imageGalleryItem}>
            <img
                className={css.ImageGalleryItemImage}
                src={previewImage}
                alt={alt}
                onClick={onClickImage}
            />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    previewImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClickImage: PropTypes.func.isRequired,
};
