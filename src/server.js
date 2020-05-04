const Koa = require('koa');
const configs = require('./configs');
const database = require('./database');
const middleware = require('./middleware');
const mainService = require('./service/mail');

class Server {
  constructor (port) {
    this.port = port;
    this.app = new Koa();
  }

  async _initializeDatabase () {
    await database.init();
  }

  _initializeMiddlewares () {
    this.app.use(middleware.server.notFound);
    this.app.use(middleware.server.exception);
    this.app.use(middleware.server.bodyParser);
  }

  _initializeRouters () {
    require('./router').routes(this.app);
  }

  _initializeErrorHandle () {
    process.on('unhandledRejection', async (reason, p) => {
      await mainService.send({ subject: process.env.NAME, html: p });
    });
    process.on('rejectionHandled', async (p) => {
      await mainService.send({ subject: process.env.NAME, html: p });
    });
    process.on('uncaughtException', async (err) => {
      await mainService.send({ subject: process.env.NAME, html: err });
    });
  }

  _listen () {
    this.app.listen(this.port);
  }

  async init () {
    await this._initializeDatabase();
    this._initializeMiddlewares();
    this._initializeErrorHandle();
    this._initializeRouters();
    this._listen();

    return this.app;
  }
}

module.exports = new Server(configs.server.port);
