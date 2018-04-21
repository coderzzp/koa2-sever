var mongoose =  require('mongoose')
var articleheads = require('../models/articlehead')
var articletexts = require('../models/articlehtml')

exports.findAllHead = async (limitNum) => {
	var query = articleheads.find({}).limit(limitNum);
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
exports.findAllHeadNum=async ()=>{
  return await new Promise((reslove,reject)=>{
		articleheads.count({},(err,count)=>{
			reslove(count)
		})
	})
}
exports.findIdeaById = async (id)=>{
  console.log(`id:${id}`)
  var query =articletexts.findOne({_id:id})
  let res={}
  await query.exec(function(err, blog) {
		if(err) {
			res = {}
		}else {
			res = blog
		}
	})
  return res
}