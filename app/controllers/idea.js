var mongoose = require('mongoose')
import ideaHelper from '../dbhelper/ideaHelper'

exports.allHead = async (ctx, next) => {
  const NUM_PAGE=5
  const page=ctx.params.page
  const limitNum=NUM_PAGE*page
  const data= await ideaHelper.findAllHead(limitNum)
  const NUM_HEAD= await ideaHelper.findAllHeadNum()
  //如果已经请求了超过blog总数的
  if(limitNum>=NUM_HEAD){
    ctx.body = {
      success: true,
      isEnd:true,
      data
    }
  }else{
    ctx.body = {
      success: true,
      data
    }
  }
}
exports.getIdeaById= async (ctx,next)=>{
  const id=ctx.params.id
  const data = await ideaHelper.findIdeaById(id)
  ctx.body = {
    success: true,
    data
  }
}