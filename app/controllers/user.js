'use strict'

// var xss = require('xss')
var mongoose =  require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
// var userHelper = require('../dbhelper/userHelper')
import userHelper from '../dbhelper/userHelper'

/**
 * 注册新用户
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.signup = async (ctx, next) => {
  console.log(ctx.request.body)
  var userName = ctx.request.body.userName.trim()
  console.log(`输入账户${userName}`)
  var password = ctx.request.body.password.trim()
  console.log(`输入密码${password}`)

  var user = await User.findOne({
	  userName: userName
	}).exec()
  
	
  var verifyCode = Math.floor(Math.random()*10000+1)

	if (!user) {
	  var accessToken = uuid.v4()
	  user = new User({
	    userName: userName,
      password: password,
    })
    
    user = await user.save()
    
    delete user.password
    console.log(`session:${user} `)
    ctx.session.user = user 
    ctx.body = {
      success: true
    }
	}
	else {
    // user.verifyCode = verifyCode
    console.log(`已存在的用户名${user}`)
    ctx.body = {
      success: false,
      reason: '该用户名已存在！'
    }
    return next
	}
}

exports.signIn = async (ctx, next) => {
  console.log(ctx.session)
  var userName = ctx.request.body.userName.trim()
  console.log(`登陆输入账户${userName}`)
  var password = ctx.request.body.password.trim()
  console.log(`登陆输入密码${password}`)
  console.log(`ctx.session.user.userName:${ctx.session.user.userName}`)
  
	var user = await User.findOne({
	  userName: userName
	}).exec()
  
	
	var verifyCode = Math.floor(Math.random()*10000+1)
	if (!user) {
	  var accessToken = uuid.v4()
    ctx.body = {
      success: false,
      reason:'用户名不存在'
    }
	}
	else if(user.password!==password){
    ctx.body = {
      success: false,
      reason: '密码错误'
    }
	}else{
    ctx.body = {
      success: true
    }
  }

	// try {
  //   user = await user.save()
  //   ctx.body = {
  //     success: true
  //   }
  // }
  // catch (e) {
  //   console.log(`保存时的错误：${e}`)
  //   ctx.body = {
  //     success: false,
  //     reason: '保存时的错误！'
  //   }

  //   return next
  // }

}
/**
 * 更新用户信息操作
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.update = async (ctx, next) => {
  var body = ctx.request.body
  var user = ctx.session.user
  var fields = 'avatar,gender,age,nickname,breed'.split(',')

  fields.forEach(function(field) {
    if (body[field]) {
      user[field] = xss(body[field].trim())
    }
  })

  user = await user.save()

  ctx.body = {
    success: true,
    data: {
      nickname: user.nickname,
      accessToken: user.accessToken,
      avatar: user.avatar,
      age: user.age,
      breed: user.breed,
      gender: user.gender,
      _id: user._id
    }
  }
}



/**
 * 数据库接口测试
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.users = async (ctx, next) => {
  var data = await userHelper.findAllUsers()
  // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
  // console.log('obj=====================================>'+obj)
  
  ctx.body = {
    success: true,
    data
  }
}
exports.addUser = async (ctx, next) => {
  var user = new User({
      nickname: '测试用户',
      avatar: 'http://ip.example.com/u/xxx.png',
      phoneNumber: xss('13800138000'),
      verifyCode: '5896',
      accessToken: uuid.v4()
    })
  var user2 =  await userHelper.addUser(user)
  if(user2){
    ctx.body = {
      success: true,
      data : user2
    }
  }
}
exports.deleteUser = async (ctx, next) => {
  const phoneNumber = xss(ctx.request.body.phoneNumber.trim())
  console.log(phoneNumber)
  var data  = await userHelper.deleteUser({phoneNumber})
  ctx.body = {
    success: true,
    data
  }
}