import css from './Searchbar.module.css'
import { Component } from "react";
import { toast } from 'react-toastify';

export default class Searchbar extends Component{
    state = {
        searchQuery: '',
    }

    handleChange = e => {
        this.setState({
            searchQuery: e.currentTarget.value.toLowerCase()
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { searchQuery } = this.state;

        if (searchQuery.trim() === '') {
            toast.error('Input image name!', {
                position: "top-center",
                autoClose: 5000
            });
            return;
        }
        this.props.onSubmit(searchQuery);
        this.reset();
    }

    reset = () => {
        this.setState({searchQuery: ''})
    }

    render() {
        const { searchQuery } = this.state;
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoFocus
                        autoComplete="off"
                        placeholder="Search images and photos"
                        value={searchQuery}
                        onChange={this.handleChange}
                    />
                </form>
        </header>
        )
    }
}