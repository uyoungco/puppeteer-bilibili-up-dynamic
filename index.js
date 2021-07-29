const Koa = require("koa")
const KoaRouter = require("koa-router")

const app = new Koa();
const router = new KoaRouter()

const screenshotControllers = require('./controllers/puppeteer')

router.get("/api/puppeteer/v1/screenshot", screenshotControllers.api.screenshot)


app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000, () => console.log('开启成功'))
