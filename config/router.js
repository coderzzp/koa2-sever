'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')
const Blog = require('../app/controllers/blog')
const Idea = require('../app/controllers/idea')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  router.post('/u/signup', App.hasBody, User.signup)
  router.post('/u/signin', App.hasBody, User.signIn)
  router.post('/u/update', App.hasBody, App.hasToken, User.update)
  router.post('/b/publish', App.hasBody,App.hasSession, Blog.publish)
  router.post('/u/changeheadimg', App.hasBody,App.hasSession, User.changeHeadImg)
  router.get('/b/main/:page', Blog.main)
  router.get('/b/auth', App.hasSession, Blog.auth)
  router.post('/b/delblog',  App.hasBody,App.hasSession,Blog.del)
  router.get('/b/like/:blogId',  App.hasSession,Blog.like)
  router.get('/b/dislike/:blogId',  App.hasSession,Blog.disLike)
  router.get('/user/info', App.hasSession, User.info)
  router.get('/idea/head/:page', Idea.allHead)
  router.get('/idea/:id', Idea.getIdeaById)
  router.get('/test', Blog.test)

  // DB Interface test
  router.get('/test/user/users',User.users)
  router.post('/test/user/add',User.addUser)
  router.post('/test/user/delete',User.deleteUser)

  return router
}