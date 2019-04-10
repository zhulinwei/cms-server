const path = require('path');
const send = require('koa-send');
const service = require('../service');

class BackupController {
  async downloadDataOfCms (ctx, next) {
    const { name, path: url } = await service.backup.downloadDataOfCms();
    await send(ctx, name, { root: path.dirname(url) });
  }
}

module.exports = new BackupController();
