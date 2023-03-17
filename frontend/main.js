//Carregar o css no main (usando os loaders)
require('core-js/stable')
require('regenerator-runtime/runtime')

const navbarResponsive = require('./modules/navbarResponsive')
const FormValidator = require('./modules/formValidator')


navbarResponsive()
const validator = new FormValidator();

