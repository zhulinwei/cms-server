
class Router {
  constructor () {
    this.routers = {
      bg: require('./bg'),
      api: require('./api')
    };
  }

  routes (app) {
    Object.keys(this.routers).map(key => {
      app.use(this.routers[key].routes());
      app.use(this.routers[key].allowedMethods());
    });
  }
}

module.exports = new Router();
