const redis = require('./redis');
const mongodb = require('./mongodb');

class Db {
  constructor() {
    this.redis = {};
    this.mongodb = {};
  }

  async init(){
    this.redis = await redis.init();
    console.log('redis初始化成功');
    this.mongodb = await mongodb.init();
    console.log('mongodb初始化成功');
  }
}

module.exports = new Db();
