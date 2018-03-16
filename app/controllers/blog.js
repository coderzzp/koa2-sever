'use strict'

// var xss = require('xss')
var mongoose =  require('mongoose')
var Blog = mongoose.model('Blog')
var uuid = require('uuid')
import blogHelper from '../dbhelper/blogHelper'

exports.publish = async (ctx, next) => {
  console.log(ctx.request.body)
  var word = ctx.request.body.word.trim()
  console.log(`输入word${word}`)
  var uploadedFileCloudinaryUrl = ctx.request.body.uploadedFileCloudinaryUrl.trim()
  console.log(`输入url${uploadedFileCloudinaryUrl}`)
  console.log(ctx.session)
  var userName =  ctx.session.user.userName
  var blog = new Blog({
    userName,
    word,
    uploadedFileCloudinaryUrl,
  })
  
  blog = await blog.save()
  console.log(blog)

  ctx.body = {
    success: true
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
exports.auth = async (ctx, next) => {
  console.log("1111111111111")
  ctx.body = {
    success:true
  }
}
exports.main = async (ctx, next) => {
  var data = await blogHelper.findAllBlogs()
  // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
  // console.log('obj=====================================>'+obj)
  
  ctx.body = {
    success: true,
    data
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