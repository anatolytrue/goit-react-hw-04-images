import { Component } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'Services/pixabayAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ImageErrorView from './ImageErrorView/ImageErrorView';


export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
    totalHits: 0,
    showModal: false,
    modalImage: null,
    error: ''
  };

    searchValue = newQuery => {
    if (newQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery: newQuery,
        page: 1,
      });
    }
    };
  
    loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    };
  
    toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: largeImageURL,
    }));
  };


  componentDidUpdate(_, prevState) {
    const prevImages = prevState.searchQuery;
    const prevPage = prevState.page;

    const nextImages = this.state.searchQuery;
    const nextPage = this.state.page;

    if (prevImages !== nextImages || prevPage !== nextPage) {
      this.setState({
        status: 'pending',
      });
      if (nextPage === 1) {
        this.setState({ images: [] });
      }
      this.fetchGallery();
    }
  }

  fetchGallery = () => {
    const { searchQuery, page } = this.state;

    fetchImages(searchQuery, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolved',
          totalHits: response.totalHits,
        }));

        if (response.hits.length === 0) {
          this.setState({
            status: 'rejected',
          });
          toast.error(`Can't search picture: "${searchQuery}"`)
        }

        window.scrollBy({
          top: 300,
          behavior: "smooth",
        });
      })
      .catch(error =>
        this.setState({ error: error.message, status: 'rejected' })
      );
  };

  render() {
    const { images, status, showModal, totalHits } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchValue} />

        {status !== 'idle' && images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {status === 'resolved' && images.length !== totalHits && (
          <Button onClick={this.loadMore}/>
        )}

        {status === 'rejected' && <ImageErrorView />}

        {status === 'pending' && <Loader />}

        {showModal && (
          <Modal modalImage={this.state.modalImage} closeModal={this.toggleModal} />
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
      </div>
    );
  }
}
