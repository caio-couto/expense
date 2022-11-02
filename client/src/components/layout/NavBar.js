import {Link} from 'react-router-dom';
import Container from './Container';
import styles from './NavBar.module.css';
/* import logo from '../../img/costs_logo.png' */

function NavBar()
{
    return(
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to='/'>Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/projects'>Projetos</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;