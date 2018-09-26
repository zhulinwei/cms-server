const config = require('./configs');
const service = require('./server');

service.start()
  .then(app => {
    app.listen(config.server.port);
    console.log('服务启动成功');
  }).catch(err => {
    // TODO
    console.log(err);
  });

