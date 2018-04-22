const superagent = require('superagent')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const parse = require('./spider/parse.js')
var schedule = require('node-schedule');
const articleHeadModel = require('./app/models/articlehead')
const articleHtmlModel = require('./app/models/articlehtml')
const SPIDER_PAGE=3
console.log('spider脚本开启')
var j = schedule.scheduleJob('55 * * * *', function(){
  mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  db=mongoose.connection  
  const clear=async ()=>{
    const clearHead=new Promise((resolve,reject)=>{
      db.dropCollection('articleheads',()=>{
        resolve()
      })
    })  
    const clearHtml=new Promise((resolve,reject)=>{
      db.dropCollection('articlehtmls',()=>{
        resolve()
      })
    })  
    let clearHeadAndHtml=Promise.all([clearHead,clearHtml])
    return await clearHeadAndHtml
  }
  
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function() {
    console.log('连接数据库成功，开始清理数据库...')
    await clear()
    console.log('清理完毕！开始爬虫...')
    const spider = async ()=>{
      const data = await new Promise( (resolve,reject)=>{
        for(var page =1;page<=SPIDER_PAGE;page++){
          console.log(`正在爬去第${page}页`)
          superagent.get(`http://www.beta-architecture.com/page/${page}`)
          .end(async function (err, sres) {
            if (err) {
              console.log(err)
              return 
            }
            var $ = cheerio.load(sres.text)
            var $c_post=Array.prototype.slice.call($('.c-post'))
            const articles = await parse($c_post,$)
            resolve(articles)
            console.log(`第${page}页爬取完毕~~~~`)
          });
        }    
      })
    }
    await spider()
    console.log('爬虫爬取所有数据完毕！')
  });
});
