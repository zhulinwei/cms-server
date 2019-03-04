const config = require('../configs').mongodb;
const MongoClient = require('mongodb').MongoClient;

class Mongodb {
  constructor() {
    this.dbs = {};
  }
 
  // 允许连接多个Mongodb库 
  async __connection(dbs) {
    if (!dbs || dbs.length < 1) return [];
    return await Promise.all(dbs.map(db=> {
      const url = config[db].url || '';
      const options = config[db].options || {};
      return MongoClient.connect(url, options);
    }));
  }

  async init() {
    if (Object.keys(this.dbs).length > 0) return this.dbs;
    const dbs = Object.keys(config);
    const clients = await this.__connection(dbs).catch(err => {
      // TODO 错误处理
      console.log(err);
      return [];
    });

    dbs.forEach((db, index) => {
      if (clients[index] instanceof MongoClient) {
        this.dbs[db] = clients[index].db(db);
      }
    });
    return this.dbs;
  }
}

module.exports = new Mongodb();

