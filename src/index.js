const moment = require('moment');
const config = require('./configs');
const service = require('./server');
const mainService = require('./service/mail');

service.start()
  .then(async app => {
    app.listen(config.server.port);
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    await mainService.send({ subject: 'cms系统推送通知', html: `服务启动成功，启动时间：${now}` }); 
    console.log(`服务启动成功，启动时间：${now}`);
  }).catch(async err => {
    console.log(err);
    await mainService.send({ subject: 'cms系统错误警报', html: err }); 
    console.log(`服务启动失败`);
  });

