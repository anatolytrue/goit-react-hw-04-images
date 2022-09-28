import css from './ImageGallery.module.css';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import fetchImages from 'Services/pixabayAPI';
import  Button  from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import ImageErrorView from 'components/ImageErrorView';


class ImageGallery extends Component {

    state = {
        images: [],
        page: 1,
        responseTotalHits: null,
        loadMore: false,
        status: 'idle',
        imageSelected: null,
        error: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const notifyError = () =>
            toast.error(`Can't search picture: ${nextSearchQuery}`);
        
        const prevSearchQuery = prevProps.searchQuery;
        const nextSearchQuery = this.props.searchQuery;

        const { page, responseTotalHits } = this.state;

        if (prevSearchQuery !== nextSearchQuery) {
            this.setState({
                status: 'pending',
                page: 1,
                loadMore: false,
                images: [],
            });

            fetchImages(nextSearchQuery, page)
                .then(data => {
                    this.setState({ responseTotalHits: data.totalHits });
                    return data.hits;
                })
                .then(images => {
                    if (images.length === 0) {
                        this.setState({
                            images,
                            status: 'idle',
                        });
                        notifyError();
                        return;
                    }
                    this.setState({ images, status: 'resolved', loadMore: true });
                })
                .catch(error => this.setState({ error, status: 'rejected' }));
        }

        if (page !== prevState.page && prevSearchQuery === nextSearchQuery) {
            this.setState({ status: 'pending' });

            if (responseTotalHits / 12 <= page) {
                this.setState({loadMore: false})
            }

            fetchImages(nextSearchQuery, page)
                .then(data => data.hits)
                .then(newImages =>
                    this.setState(prevState => ({
                        images: [...prevState.images, ...newImages],
                        status: 'resolved',
                    })),)
                .catch(error => this.setState({ error, status: 'rejected' }));
        }

        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

    handleSelectImage = image => {
        this.setState({ imageSelected: image })
    };

    handleCloseModal = () => {
        this.setState({ imageSelected: null })
    };

    handleClickButton = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };

    render() {

        const { status, images, loadMore, imageSelected, error } = this.state;

        if (status === 'idle') {
            return (<div>What pics You want to find?</div>)
        }
        if (status === 'pending') {
            return <Loader/>
        }
        if (status === 'rejected') {
            return<><ImageErrorView message={error.message} /></>
        }
        if (status === 'resolved') {
            return (
                <div>
                    <ul className={css.ImageGallery}>
                        <ImageGalleryItem
                        images={images}
                        onClick={this.handleSelectImage}
                        />
                    </ul>
                    {loadMore && <Button onClick={this.handleClickButton} />}
                    {imageSelected && (
                        <Modal
                            onClick={this.handleCloseModal}
                            src={imageSelected.largeImageURL}
                            alt={imageSelected.tags}
                        />
                    )}
                </div>
            );
        }
    }
    }

export default ImageGallery;


