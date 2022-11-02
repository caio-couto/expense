const routes = require('express').Router();
const { findAllCategories, createNewCategory } = require('../controller/categoryController');

routes.get('/category', findAllCategories);
routes.post('/category', createNewCategory);

module.exports = routes;