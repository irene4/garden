const express = require('express');

const userController = require('./controllers/user')

const routes = express();

routes.post('/signup', userController.signup)
routes.post('/login', userController.login)

routes.get('/signup', (req, res) => res.render('signup'))
routes.get('/login', (req, res) => res.render('login'))

module.exports = routes;