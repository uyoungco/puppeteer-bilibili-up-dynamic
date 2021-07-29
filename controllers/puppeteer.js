const service = require("../service/puppeteer")

const screenshot = (ctx, next) => {
  return service.api.screenshot(ctx)
}

exports.api = {
  screenshot
}
