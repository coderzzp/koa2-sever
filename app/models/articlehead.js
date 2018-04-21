var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleHeadSchema = new Schema({
	title: {
    type: String
  },
  imgSrc: String,
})

var articleHeadModel = mongoose.model('articlehead', articleHeadSchema)

module.exports = articleHeadModel