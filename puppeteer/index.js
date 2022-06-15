const puppeteer = require('puppeteer');

const ENV = process.env.NODE_ENV === "development"
console.log("PUPPETEER_EXECUTABLE_PATH", process.env.PUPPETEER_EXECUTABLE_PATH)

/**
 * 根据UP ID
 * @param id UP主ID
 * @return {Promise<string|null>}
 */
const getScreenshot = async (id) => {

  const browser = ENV ? await puppeteer.launch() : await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
  });

  const page = await browser.newPage(); // 234407877
  await page.goto(`https://space.bilibili.com/${id}/dynamic`);
  // await page.screenshot({ path: 'example.png' });
  await page.addStyleTag({
    content: `
      #navigator-fixed, .lt-row, .to-top{display: none !important;}
    `
  })
  
  let image
  try {
    const dynamicListDom = await page.waitForSelector("#page-dynamic")
    const dynamicList = await dynamicListDom.$$(".bili-dyn-list__item")
    const isTop = await dynamicList[0].$('.bili-dyn-item__tag')
    const dynamic = isTop ? dynamicList[1] : dynamicList[0] // 过滤置顶动态
    const action = await dynamic.$('.bili-rich-text__action')
    if (action) { // 展开
      await action.click()
    }
    image = await dynamic.screenshot({ quality: 100, type: "jpeg", encoding: "base64" })
  } catch(e) {
    console.log(e)
  }
  
  await page.close()
  await browser.close();
  if(image) {
    return "data:image/jpg;base64," + image
  }
  return null
}

/**
 * 根据动态ID返回图片
 * @param cid 动态ID
 * @return {Promise<string|null>}
 */
const getScreenshot2 = async (cid) => {

  const browser = ENV ? await puppeteer.launch() : await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
  });

  const page = await browser.newPage();
  await page.goto(`https://t.bilibili.com/${cid}`);
  await page.addStyleTag({
    content: `
      #internationalHeader,
      .panel-area,
      .lt-row,
      .to-top
      .unlogin-popover {
        display: none!important;
    }`
  })
  
  let image
  try {
    const dynamicListDom = await page.waitForSelector(".card")
    const dynamic = await dynamicListDom.$(".bili-dyn-item")
    image = await dynamic.screenshot({ quality: 100, type: "jpeg",encoding: "base64" })
  } catch(e) {
    console.log(e)
  }
  await page.close()
  await browser.close();
  if(image) {
    return "data:image/jpg;base64," + image
  }
  return null
}

exports.getScreenshot = getScreenshot

exports.getScreenshot2 = getScreenshot2
