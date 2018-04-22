const superagent = require('superagent')
const cheerio = require('cheerio')
const mongoose =  require('mongoose')
// const translate = require('./translate')
const articleHeadModel = require('../app/models/articlehead')
const articleHtmlModel = require('../app/models/articlehtml')

var parse = async function(beParsed,$){
  console.log(`共${beParsed.length}条数据`)
  for(var index in beParsed){
    let element = beParsed[index]
    console.log(`正在爬第${index}条...`)
    //如果该元素底下有(<a>标签)
    if($(element).find('a')){
      var articleHref = $(element).find('a').attr('href');
      var $article_a_img = $(element).find('img');
      var $article_header = $(element).find('header');
      var html = await new Promise((resolve,reject)=>{
        superagent.get(articleHref)
          .end(function (err, sres) {
            if(err){
              console.log(`出现了一个错误${err}`)
              return resolve('')
            }
            let a = cheerio.load(sres.text)
            let html=a('#content').html()
            resolve(html)
          })
      })
      if(html){
        let headObj={
          title:$article_header.html(),
          imgSrc:$article_a_img.attr('src'),
        }
        //保存到mongodb
        let articleHeadEntity = new articleHeadModel(headObj)
        var bb=await articleHeadEntity.save()
        //
        let articleHtmlEntity = new articleHtmlModel({
          _id:bb._id,
          html:html
        })
        var cc = await articleHtmlEntity.save()
        console.log(`第${index}条爬取完毕！`)
      }else{
        console.log(`第${index}条数据没有html值！`)
      }
    }else{
      console.log(`第${index}条数据没有a元素！`)
    }
    
    //
    
  }
  return 
}
module.exports=parse