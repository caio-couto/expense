import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import styles from './Projects.module.css';
import Container from '../layout/Container';
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";

function Projects()
{
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = '';
    if(location.state)
    {
        message = location.state.message;
    }

    useEffect(() =>
    {
        setTimeout(() =>
        {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) =>
            {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch((error) =>
            {
                console.log(error);
            })
        }, 300)
    }, [])

    function removeProject(id)
    {
        fetch(`http://localhost:5000/projects/${id}`, 
        {
            method: 'DELETE',
            headers: 
            {
                'Contente-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then(() =>
        {
            setProjects(projects.filter((project) =>
            {
                return project._id !== id
            }))
            setProjectMessage('Projeto removido com sucesso')
        })
        .catch((error) =>
        {
            console.log(error);
        })
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newprojects' text='Criar projeto'/>
            </div>
            {message && <Message msg={message} type='success'/>}
            {projectMessage && <Message msg={projectMessage} type='success'/>}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) =>
                    (
                        <ProjectCard 
                            name={project.name} 
                            id={project._id} 
                            budget={project.budget} 
                            category={project.category.name} 
                            key={project._id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (<p>Não há projetos cadastrados</p>)}
            </Container>
        </div>
    );
}

export default Projects;