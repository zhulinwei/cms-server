const _ = require('lodash');
const QQStrategy = require('./qq');
const TouristStrategy = require('./tourist');

class Authenticator {
  constructor() {
    this.strategies = {};
  }
  
  use(name, strategy) {
    if (!name) throw Error('策略必须需要名字！');
    this.strategies[name] = strategy;
  }
}

// 新增策略
const authenticator = new Authenticator();
authenticator.use('qq', QQStrategy);
authenticator.use('tourist', TouristStrategy);

module.exports = authenticator;
