import styles from '../project/ProjectCard.module.css';
import {BsFillTrashFill} from 'react-icons/bs'

function ServiceCard({id, name, cost, description, handleRemove})
{
    function remove(event, id)
    {
        event.preventDefault();
        handleRemove(id, cost);
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={(event) => {remove(event, id)}}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;