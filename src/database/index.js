const redis = require('./redis');
const mongodb = require('./mongodb');

const debug = require('debug')('cms:database');

class Database {
  constructor () {
    this.redis = {};
    this.mongodb = {};
  }

  async init () {
    try {
      this.redis = await redis.init();
      debug('redis初始化成功');
      this.mongodb = await mongodb.init();
      debug('mongodb初始化成功');
    } catch (error) {
      // TODO 错误处理
      debug(error);
    }
  }
}

module.exports = new Database();
