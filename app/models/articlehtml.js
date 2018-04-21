var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleHtmlSchema = new Schema({
	html: {
    type: String
  },
})

var articleHtmlModel = mongoose.model('articlehtml', articleHtmlSchema)

module.exports = articleHtmlModel