import css from './Button.module.css'

const Button = ({ onClick }) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            className={css.Button}
        >
            Load more
        </Button>
    );
};
export default Button; 