const express = require('express'); 
const route = express.Router(); 

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController')

const { requiredLogin } = require('./src/middlewares/middlewares')

// Home 
route.get('/', homeController.index);

// Login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Contact
route.get('/contact/index', requiredLogin, contactController.index)
route.get('/contact/form', requiredLogin, contactController.form)
route.post('/contact/register', requiredLogin, contactController.register)
route.get('/contact/editId/:_id', requiredLogin, contactController.editIndex)
route.post('/contact/edit/:_id', requiredLogin, contactController.edit)
route.get('/contact/delete/:_id', requiredLogin, contactController.delete)

module.exports = route;