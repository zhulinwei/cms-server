const Koa = require('koa');
const database = require('./database');
const middleware = require('./middleware');
const mainService = require('./service/mail');

class Service {
  async start () {
    await database.init();
    const app = new Koa();
    app.use(middleware.service.notFound);
    app.use(middleware.service.exception);
    app.use(middleware.service.bodyParser);
    process.on('unhandledRejection', async (reason, p) => {
      await mainService.send({ subject: process.env.NAME, html: p });
    });

    process.on('rejectionHandled', async (p) => {
      await mainService.send({ subject: process.env.NAME, html: p });
    });

    process.on('uncaughtException', async (err) => {
      await mainService.send({ subject: process.env.NAME, html: err });
    });
    // 路由的进入必须在初始化数据库之后
    const router = require('./router');
    router.routes(app);
    return app;
  }
}

module.exports = new Service();
