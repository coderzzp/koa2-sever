var Koa = require('koa');
var bodyParser = require('koa-body')

var app = new Koa();
app.use(bodyParser({multipart: true}));
 
app.use(async ctx => {
  // the parsed body will store in ctx.request.body 
  // if nothing was parsed, body will be an empty object {} 
  console.log(ctx.request.body.fields)
  ctx.body = ctx.request.body.fields;
});
app.listen(3000)