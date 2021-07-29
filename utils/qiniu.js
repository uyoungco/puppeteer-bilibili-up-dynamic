const qiniu = require("qiniu")

const Updata = (fileName, readableStream) => new Promise((resolve, reject) => {
  const accessKey = 'JMzlRZuZikV-iU4feqW_tIeKXEQzqsx3bDXVII1a';
  const secretKey = 'rsKblposrOjnILj1pOi3lwAJTHwCTozSuBUFPY5B';
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: "bilibili-up-dynamic",
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  
  const uploadToken = putPolicy.uploadToken(mac);
//----------------------------------------------
  const config = new qiniu.conf.Config();
// 空间对应的机房
  config.zone = qiniu.zone.Zone_z0;
// 是否使用https域名
  config.useHttpsDomain = true;
// 上传是否使用cdn加速
  config.useCdnDomain = true;
  
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // const readableStream = xxx; // 可读的流
  formUploader.putStream(
    uploadToken,
    fileName,
    readableStream,
    putExtra,
    function(respErr, respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode === 200) {
        console.log(respBody);
        resolve(respBody)
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
        resolve({key: null})
      }
    });
})

exports.Updata = Updata
