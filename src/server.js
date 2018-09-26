const Koa = require('koa');
const database = require('./database');
const middleware = require('./middleware');
const mainService = require('./service/mail');

class Service {
  async start() {
    await database.init();
    const app = new Koa();
    
    app.use(middleware.serviceMiddleware.notFound); 
    app.use(middleware.serviceMiddleware.exception);
    app.use(middleware.serviceMiddleware.bodyParser);
    
    process.on('unhandledRejection', (reason, p) => { 
      mainService.send({ subject: process.env.NAME, html: p }); 
    });

    process.on('rejectionHandled', (p) => {
      mainService.send({ subject: process.env.NAME, html: p }); 
    });

    process.on('uncaughtException', (err) => {
      mainService.send({ subject: process.env.NAME, html: err }); 
    });

    // 路由的进入必须在初始化数据库之后 
    const router = require('./router');
    router.routes(app);
    // app.listen(config.port);
    // console.log('开启成功')
    return app;
  }
}

module.exports = new Service();

