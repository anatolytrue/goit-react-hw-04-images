import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component{

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClick();
        }
    }

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClick();
        }
    };

    render() {
        return createPortal(
            <div
                className={css.Overlay}
                onClick={this.handleBackdropClick}>
                    <div className={css.Modal}>
                        <img src={this.props.src} alt={this.props.alt} />
                        <button
                            type='button'
                            onClick={this.props.onClick}>
                            x
                        </button>
                    </div>
            </div>,
            modalRoot,
        )
    }
}