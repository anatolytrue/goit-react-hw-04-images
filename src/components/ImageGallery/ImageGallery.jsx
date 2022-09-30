import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';


export default function ImageGallery({ images, toggleModal }) {
    return (
        <ul className={css.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
                key={id}
                alt={tags}
                previewImage={webformatURL}
                onClickImage={() => {
                    toggleModal(largeImageURL);
                }}
            />
        ))}
    </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })
    ),
    toggleModal: PropTypes.func.isRequired,
};

