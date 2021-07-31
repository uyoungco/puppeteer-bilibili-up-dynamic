const puppeteer = require('puppeteer');
// const puppeteer = require('puppeteer-core');

// https://t.bilibili.com/553112545586555735

const ENV = process.env.NODE_ENV === "development"
console.log("PUPPETEER_EXECUTABLE_PATH", process.env.PUPPETEER_EXECUTABLE_PATH)

const getScreenshot = async (id) => {

  const browser = ENV ? await puppeteer.launch() : await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
  });

  const page = await browser.newPage(); // 234407877
  await page.goto(`https://space.bilibili.com/${id}/dynamic`);
  // await page.screenshot({ path: 'example.png' });
  await page.addStyleTag({content: ".lt-row{display: none !important;} .button-bar{display: none !important;}"})
  
  let image
  try {
    const domCard = await page.waitForSelector(".card")
    image = await domCard.screenshot({ quality: 100, type: "jpeg",encoding: "base64" })
  } catch(e) {
    console.log(e)

  }
  
  await page.close()
  await browser.close();
  if(image) {
    return "data:image/jpg;base64," + image
  } else {
    return null
  }
  
}

exports.getScreenshot = getScreenshot
