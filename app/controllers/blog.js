'use strict'

// var xss = require('xss')
var mongoose =  require('mongoose')
var Blog = mongoose.model('Blog')
var uuid = require('uuid')
import blogHelper from '../dbhelper/blogHelper'
import { save } from 'babel-register/lib/cache';

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
    like:0,
    likeUserName:[]
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
  const blogId=ctx.request.body._id

  ctx.body = {
    success:true
  }
}
exports.del = async (ctx, next) => {
  const blogId = ctx.request.body._id
  console.log(blogId)
  try {
    var Done  = await blogHelper.deleteBlog({_id:blogId})
    if(Done){
      ctx.body = {
        success: true,
      }
    }else{
      ctx.body = {
        success: false,
      }
    }
    
  }
  catch (e) {
    console.log(`保存时的错误：${e}`)
    ctx.body = {
      success: false,
      reason: '保存时的错误！'
    }

    return next
  }
}
exports.test = async (ctx, next) => {
  ctx.body = {
    success:true,
    test:'测试成功!'
  }
}
exports.like = async (ctx, next) => {
  const {userName}=ctx.session.user
  const blogId=ctx.params.blogId
  var data = await blogHelper.like(userName,blogId)
  ctx.body = {
    data
  }
}
exports.disLike = async (ctx, next) => {
  const {userName}=ctx.session.user
  const blogId=ctx.params.blogId
  var data = await blogHelper.disLike(userName,blogId)
  ctx.body = {
    data
  }
}
exports.main = async (ctx, next) => {
  var data = await blogHelper.findAllBlogs()
  // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
  // console.log('obj=====================================>'+obj)
  data.reverse()
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