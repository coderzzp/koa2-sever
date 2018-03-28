var mongoose =  require('mongoose')
var Blog = mongoose.model('Blog')

/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.findAllBlogs = async () => {
  var query = Blog.find({})
  console.log(query)
	var res = null
	await query.exec(function(err, blog) {
		if(err) {
			res = {}
		}else {
			res = blog
		}
	})
	// console.log('res====>' + res)
	return res;
}
exports.deleteBlog = async ({_id}) => {
  var flag = false
	await Blog.remove({_id}, function(err) {
		if(err) {
			flag = false
		}else{
			flag = true
		}
		
	})
	return flag;
}