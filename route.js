const KoaRouter = require("koa-router")

const screenshotControllers = require('./controllers/puppeteer')

const router = new KoaRouter()
exports.router = router.get('/api/puppeteer/v1/screenshot', screenshotControllers.api.screenshot)
