import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');


export default function Modal({ modalImage, closeModal }) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    })
    
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    }

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.closeModal();
        }
    };

    return createPortal(
            <div
                className={css.Overlay}
                onClick={handleBackdropClick}>
                    <div className={css.Modal}>
                        <img src={modalImage} alt="big" />
                        <button
                            type='button'
                            onClick={() => closeModal()}
                            className={css.modalBtn}>
                        </button>
                    </div>
            </div>,
            modalRoot,
        )
}

Modal.propTypes = {
    modalImage: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};
// export default class Modal extends Component{

//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown);
//     }

//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
//             this.props.closeModal();
//         }
//     }

//     handleBackdropClick = e => {
//         if (e.target === e.currentTarget) {
//             this.props.closeModal();
//         }
//     };

//     render() {
//         const { modalImage , closeModal} = this.props;
//         return createPortal(
//             <div
//                 className={css.Overlay}
//                 onClick={this.handleBackdropClick}>
//                     <div className={css.Modal}>
//                         <img src={modalImage} alt="big" />
//                         <button
//                             type='button'
//                             onClick={() => closeModal()}
//                             className={css.modalBtn}>
//                         </button>
//                     </div>
//             </div>,
//             modalRoot,
//         )
//     }

    
// }

