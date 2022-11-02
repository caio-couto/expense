const routes = require('express').Router();
const { findAllProjects, findOneProject, createNewProject, editProject, deleteProject, addNewService, deleteService } = require('../controller/projectController');

routes.get('/projects', findAllProjects);
routes.get('/projects/:id', findOneProject);
routes.post('/projects', createNewProject);
routes.put('/projects/:id', editProject);
routes.patch('/projects/:id', addNewService);
routes.patch('/projects/:id/:service', deleteService);
routes.delete('/projects/:id', deleteProject);

module.exports = routes;