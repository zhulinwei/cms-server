const fs = require('fs');
const utils = require('../utils');
const service = require('../service');

class QiniuController {
  token(ctx, next) {
    const type = ctx.query.type;
    ctx.body = service.qiniu.token(type);
  }

  async upload(ctx, next) {
    const files = ctx.request.files;
    const keys = Object.keys(files);
    const data = await Promise.all(keys.map(async key => {
      let file = files[key];
      let reader = fs.createReadStream(file.path);
      let body = await service.qiniu.upload(reader);
      // 补充说明：如果想放在自己的服务器上，可如下操作：
      // let filePath = __dirname + `/${file.name}`;
      // let upStream = fs.createWriteStream(filePath);
      // reader.pipe(upStream);
      return utils.addQiniuHost(body.key);
    }));
    ctx.body = { errno: 0, data };
  }
}

module.exports = new QiniuController();
