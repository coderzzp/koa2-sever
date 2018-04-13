'use strict'

var mongoose =  require('mongoose')
var User = mongoose.model('User')
var Blog = mongoose.model('Blog')
/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.findByPhoneNumber = async ({phoneNumber}) => {
	var query = User.find({phoneNumber})
	var res = null
	await query.exec(function(err, user) {
		if(err) {
			res = {}
		}else {
			res = user
		}
	})
	// console.log('res====>' + res)
	return res;
}

/**
 * 查找所用用户
 * @return {[type]} [description]
 */
exports.findAllUsers = async () => {
	var query = User.find({});
	var res = []
	await query.exec(function(err, users) {
		if(err) {
			res = []
		}else {
			res = users;
		}
	})
	return res
}
exports.findUserByUserName= async (userName)=>{
	return await User.findOne({userName})
}
exports.findUserBlog = async (userName) => {
	var query = Blog.find(userName);
	var res = []
	await query.exec(function(err, users) {
		if(err) {
			res = []
		}else {
			res = users;
		}
	})
	return res
}
/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addUser = async (user) => {
	user = await user.save()
	return user
}
//update无法找到匹配信息（待修复）
exports.changeHeadImg = async (_id,userName,headImgUrl) => {
	var changeUserHead=new Promise((reslove,reject)=>{
		User.update({userName},{$set:{headImgUrl}},(err,data)=>{
			console.log(`err${err}`)
			console.log(data)
			reslove(data)
		})
	})
	var changeBlogHead=new Promise((reslove,reject)=>{
		Blog.update({userName},{$set:{headImgUrl}},{ multi: true },(err,raw)=>{
			console.log(`err${err}`)
			reslove(raw)
		})
	})
	var changedUser=await Promise.all[changeUserHead,changeBlogHead]
	console.log(`changedUser:${changedUser}`)
	return changedUser
}
/**
 * 删除用户
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.deleteUser = async ({phoneNumber}) => {
	var flag = false
	console.log('flag==========>'+flag)
	await User.remove({phoneNumber}, function(err) {
		if(err) {
			flag = false
			// return false
		}else{
			flag = true
		}
		
	})
	console.log('flag=====await=====>'+flag)
	return flag
}
