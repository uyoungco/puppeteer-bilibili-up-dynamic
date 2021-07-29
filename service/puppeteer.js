const { getScreenshot }  = require("../puppeteer/index")

const api = {
  screenshot: async (ctx) => {
    const { id } = ctx.query
    if(!id) {
      ctx.body = {
        code: 400,
        message: "参数id错误",
        data: null,
      }
      return
    }
    const res = await getScreenshot(id)
    if(res) {
      ctx.body = {
        code: 200,
        message: "成功",
        data: res,
      }
    } else {
      ctx.body = {
        code: 400,
        message: "图片截取失败或者上传失败!",
        data: null,
      }
    }
  }
}


exports.api = api
