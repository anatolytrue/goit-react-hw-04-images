import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ images, onClick }) => {
    return (
        <>
            {images &&
                images.map((image, idx) => {
                    const { id, webformatURL, tags } = image;
                    return (
                        <li key={idx} className={css.imageGalleryItem}>
                            <img
                                src={webformatURL}
                                alt={tags}
                                id={id}
                                onClick={() => onClick(image)}
                                className={css.ImageGalleryItemImage}
                            />
                        </li>
                    );
                })}
        </>
    );
    
};

export default ImageGalleryItem;