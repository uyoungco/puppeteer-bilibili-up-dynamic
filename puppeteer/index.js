const puppeteer = require('puppeteer');
// const path = require('path')
const { Updata } = require("../utils/qiniu")
let Duplex = require("stream").Duplex;
function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

const getScreenshot = async (id) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage(); // 234407877
  await page.goto(`https://space.bilibili.com/${id}/dynamic`);
  // await page.screenshot({ path: 'example.png' });
  await page.addStyleTag({content: ".lt-row{display: none !important;} .button-bar{display: none !important;}"})
  
  const domCard = await page.waitForSelector(".card")
  const dataTime = new Date().getTime()
  // const imgName = `${dataTime}_${id}.jpg`
  // await domCard.screenshot({
  //   path: imgName, // shijc+'.jpg'
  //   quality: 100,
  // });
  const image = await domCard.screenshot({ quality: 100, type: "jpeg",encoding: "base64" })
  // console.log("image",image)
  // const ImageStream = bufferToStream(image)
  // const { key } = await Updata(imgName, ImageStream)
  
  await page.close()
  await browser.close();
  if(image) {
    // return `http://bilibili-up-dynamic.uyoung.co/${key}`
    return "data:image/jpg;base64," + image
    // return "base64://"+image
  } else {
    return null
  }
  
  

}

exports.getScreenshot = getScreenshot
