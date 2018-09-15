const ioredis = require('ioredis');
const config = require('../configs').redis;

class Redis {
  constructor() {
    this.dbs = {};
  }

  async init() {
    if (Object.keys(this.dbs).length > 0) return this.dbs;
    const dbs = Object.keys(config);
     
    dbs.forEach(db => {
      this.dbs[db] = new ioredis(config[db].url);
    });
    return this.dbs;
  } 
}
module.exports = new Redis();
