import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={css.button}
        >
            Load more
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};
export default Button;

