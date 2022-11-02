import {useNavigate} from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProjects.module.css';

function NewProjects()
{
    const navigate = useNavigate()
    function createPost(project)
    {
        const { name, budget, category} = project;

        fetch('http://localhost:5000/projects',
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, budget, category: category.id})
        })
        .then((resp) => resp.json())
        .then((data) =>
        {          
            navigate('/projects', { state: { message: 'Projeto criado com sucesso!' }});
        })
        .catch((error) =>
        {
            console.log(error);
        })
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Cria projeto'/>
        </div>
    );
}

export default NewProjects;