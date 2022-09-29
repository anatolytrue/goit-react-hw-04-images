import errorImage from '../Services/sadcat.jpg';
import PropTypes from 'prop-types';

export default function ImageErrorView({ message }) {
    return (
        <div role="alert">
            <img src={errorImage} width="240" alt="sadcat" />
            <p>{message}</p>
        </div>
    )
}

ImageErrorView.propTypes = {
    message: PropTypes.string.isRequired,
};