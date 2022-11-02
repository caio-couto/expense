import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import LinkButton from '../layout/LinkButton';

function Home()
{
    return(
        <section className={styles.home_Container}>
            <div>
                <h1>Bem-vindo ao</h1>
                <h2><span className={styles.title}>Ex</span>Pense</h2>
            </div>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newprojects' text='Criar projeto'/>
        </section>
    );
}

export default Home;