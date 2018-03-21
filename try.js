var Koa = require('koa');
var bodyParser = require('koa-body')

var app = new Koa();
app.use(bodyParser({multipart: true}));
 
app.use(async ctx => {
  // the parsed body will store in ctx.request.body 
  // if nothing was parsed, body will be an empty object {} 
  
  ctx.body = '来自zzp的力量'
});
app.listen(3003)
console.log('server is running at 3003')