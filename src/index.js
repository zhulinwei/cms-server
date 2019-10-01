const moment = require('moment');
const server = require('./server');
const configs = require('./configs');
const mainService = require('./service/mail');

const debug = require('debug')('cms:server');

server.init()
  .then(() => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    // if (!configs.server.development) await mainService.send({ subject: 'cms系统推送通知', html: `服务启动成功，启动时间：${now}` });
    debug(`服务启动成功，启动时间：${now}`);
  }).catch(async error => {
    if (!configs.server.development) await mainService.send({ subject: 'cms系统错误警报', html: error });
    debug(`服务启动失败: %s`, error);
  });
