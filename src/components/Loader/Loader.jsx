import { ImSpinner } from 'react-icons/im';
import css from './Loader.module.css'

const styles = {}

export default function Loader() {

    return (
        <div role="alert">
            <div style={styles.spinner}>
                <ImSpinner size="32" className={css.iconSpin} />
                Loading...
            </div>
        </div>
    )
}