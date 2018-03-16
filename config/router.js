'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')
const Blog = require('../app/controllers/blog')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  router.post('/u/signup', App.hasBody, User.signup)
  router.post('/u/signin', App.hasBody, User.signIn)
  router.post('/u/update', App.hasBody, App.hasToken, User.update)
  router.post('/b/publish', App.hasBody,App.hasSession, Blog.publish)
  router.get('/b/main', Blog.main)
  router.get('/b/auth', App.hasSession, Blog.auth)
  router.get('/user/info', App.hasSession, User.info)

  // DB Interface test
  router.get('/test/user/users',User.users)
  router.post('/test/user/add',User.addUser)
  router.post('/test/user/delete',User.deleteUser)

  return router
}