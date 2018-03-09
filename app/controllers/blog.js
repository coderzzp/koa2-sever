'use strict'

// var xss = require('xss')
var mongoose =  require('mongoose')
var Blog = mongoose.model('Blog')
var uuid = require('uuid')
// import blogHelper from '../dbhelper/blogHelper'

exports.publish = async (ctx, next) => {
  console.log(ctx.request.body)
  var word = ctx.request.body.word.trim()
  console.log(`输入word${word}`)
  var uploadedFileCloudinaryUrl = ctx.request.body.uploadedFileCloudinaryUrl.trim()
  console.log(`输入url${uploadedFileCloudinaryUrl}`)
  console.log(ctx.session)
  var userName =  ctx.session.user.userName
  blog = new Blog({
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