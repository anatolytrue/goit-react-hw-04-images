import css from './Searchbar.module.css'
import { Component } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
    state = {
        searchQuery: '',
    };

    changeQuery = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase().trim() });
    };

    formSubmit = e => {
        e.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            toast.error('Input image name!', {
                position: "top-center",
                autoClose: 5000
            })
            return;
        }
        this.props.onSubmit(this.state.searchQuery);

        this.resetInput();
    };

    resetInput = () => {
        this.setState({ searchQuery: '' });
    };

    render() {
        const { searchQuery } = this.state;
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.formSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={searchQuery}
                        onChange={this.changeQuery}
                    />
                </form>
            </header>
            );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

