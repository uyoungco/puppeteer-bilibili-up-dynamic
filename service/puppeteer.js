const { getScreenshot, getScreenshot2 }  = require("../puppeteer/index")

const api = {
  screenshot: async (ctx) => {
    const { id, tid } = ctx.query
    if(!id && !tid) {
      ctx.body = {
        code: 400,
        message: "参数id或tid错误",
        data: null,
      }
      return
    }

    if(id) {
      const res = await getScreenshot(id)
      if(res) {
        ctx.body = {
          code: 200,
          message: "成功",
          data: res,
        }
        return
      }
    }

    if(tid) {
      const res = await getScreenshot2(tid)
      if(res) {
        ctx.body = {
          code: 200,
          message: "成功",
          data: res,
        }
        return
      }
    }

    ctx.body = {
      code: 400,
      message: "图片截取失败",
      data: null,
    }
  }
}


exports.api = api
