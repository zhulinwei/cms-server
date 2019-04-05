const redis = require('./redis');
const mongodb = require('./mongodb');

class Db {
  constructor() {
    this.redis = {};
    this.mongodb = {};
  }

  async init(){
    try {
      this.redis = await redis.init();
      console.log('redis初始化成功');
      this.mongodb = await mongodb.init();
      console.log('mongodb初始化成功');
    } catch (err) {
      console.log(err);  
    }
  }
}

module.exports = new Db();
