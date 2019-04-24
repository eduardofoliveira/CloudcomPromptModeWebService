const express = require('express')

const routes = express.Router()

const AuthMiddleware = require('../src/middlewares/auth')

const UserController = require('./app/controllers/User')
const SessionController = require('./app/controllers/Session')

routes.get('/user', AuthMiddleware, UserController.list)
routes.post('/user', AuthMiddleware, UserController.save)
routes.put('/user/:id', AuthMiddleware, UserController.update)
routes.delete('/user/:id', AuthMiddleware, UserController.remove)

routes.post('/auth', SessionController.auth)

module.exports = routes
