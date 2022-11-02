import styles from './Project.module.css';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import SeviceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project()
{
    const { id } = useParams();
    
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [services, setServices] = useState([]);
    useEffect(() =>
    {
        setTimeout(() =>
        {
            fetch(`http://localhost:5000/projects/${id}`, 
            {
                method: 'GET',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) =>
            {
                setProject(data);
                setServices(data.services);
            })
            .catch((error) =>
            {
                console.log(error);
            })
        }, 300)
    }, [ project ]);


    function editPost(project)
    {
        const { name, budget, category } = project;

        setMessage('');

       if(project.budget < project.cost)
       {
            setMessage('O orçamento não pode ser menor que o custo deo projeto');
            setType('error');
            return false
       }
       fetch(`http://localhost:5000/projects/${project._id}`,
       {
            method: 'PUT',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, budget, category: category.id}),
       })
       .then((resp) => resp.json())
       .then((data) =>
       {
            setProject(data);
            setShowProjectForm(false);
            setMessage('Projeto atualizado');
            setType('success');
       })
       .catch((error) =>
       {
            console.log(error);
       })
    }

    function createService(project)
    {

        setMessage('');

        const lastService = project.services[project.services.length - 1];
        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget))
        {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço');
            setType('error');
            project.services.pop();
            return false
        }

        project.cost = newCost;

        const { name, cost, description } = lastService;

        fetch(`http://localhost:5000/projects/${project._id}`,
        {
            method: 'PATCH',
            headers:
            {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name, cost, description, projectCost: newCost}),
        })
        .then((resp) => resp.json())
        .then(() =>
        {
            setShowServiceForm(false);
        })
        .catch((error) => console.log(error));

    }

    function removeService(id, cost)
    {   
        setMessage('');
        const servicesUpdate = project.services.filter((service) => service._id !== id);
        const projectUpdated = project;

        console.log(id);
        
        projectUpdated.services = servicesUpdate;

        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated._id}/${id}`, 
        {
            method: 'PATCH',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({projectCost: projectUpdated.cost})
        })
        .then((result) => result.json())
        .then((data) =>
        {
            setProject(projectUpdated);
            setServices(servicesUpdate);
            setMessage('Serviço removido com sucesso')
            setType('success');
        })
        .catch((error) => console.log(error))
    }

    function toggleProjectForm()
    {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm()
    {
        setShowServiceForm(!showServiceForm);
    }

    return(
        <>
            {project.name?
            (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm? 'Editar projeto' : 'fechar' }
                            </button>
                            {!showProjectForm? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText={'Concluir edição'} projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm? 'Adicionar serviços' : 'fechar' }
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && 
                                (
                                    <SeviceForm handleSubmit={createService} btnText='Adicionar serviço' projectData={project}/>
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 &&
                                services.map((service, index) =>
                                (
                                    <ServiceCard id={service._id} name={service.name} cost={service.cost} description={service.description} key={index} handleRemove={removeService}/>
                                ))
                            }
                            {services.length === 0 &&
                                <p>Não há serviços cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
            )
            :
            (
                <Loading/>
            )}
        </>
    );
}

export default Project;