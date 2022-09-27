import { Component } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import fetchImagesApi from 'Services/pixabayAPI';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    searchQuery: '',
  }

    handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  // componentDidUpdate(_, prevState) {
  //   const prevQuery = prevState.searchQuery;
  //   const prevPage = prevState.page;
  //   const {searchQuery, page, images} = this.state;

  //   if (prevPage !== page || prevQuery !== searchQuery) {
  //     this.setState({ isLoading: true });
      
  //   }
  // }

  // handleSearchSubmit = query  => {
  //   this.setState( {
  //     searchQuery: query,
  //     images: [],
  //     page: 1,
      
  //   });
  // };

  // fetchImages = async (searchQuery = '', page = 1) => {
  //   try {
  //     const { searchQuery, page } = this.state;
      
  //     this.setState({
  //       isLoading: true,
  //     });

  //     const findedImages = await fetchImagesApi(searchQuery, page);
  //     findedImages.hits.length === 0
  //       ? toast.warn('NEMA', {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       })
  //       : this.setState(prevState => ({
  //         images: [...prevState.images, ...findedImages.hits],
  //       }));
  //   } catch (error){
  //     console.log(error);

  //   } finally {
  //     this.setState({ isLoading: false})
  //   }
  // }


  render() {
    const { searchQuery } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
        </div>
      );
  }
};

export default App;