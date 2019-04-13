const mongodb = require('../../database').mongodb;

class BaseModel {
  constructor (database, collection) {
    if (!database) throw new Error('database name is not defined');
    if (!collection) throw new Error('collection name is not defined');
    this.coll = mongodb[database].collection(collection);
  }

  async insertOne (doc = {}, options = {}) {
    const result = await this.coll.insertOne(doc, options);
    return result;
  }

  async findOne (query = {}, options = {}) {
    const result = await this.coll.findOne(query, options);
    return result;
  }

  async find (query = {}, options = {}) {
    const result = await this.coll.find(query, options).toArray();
    return result;
  }

  async findOneAndUpdate (filter = {}, update = {}, options = {}) {
    const result = await this.coll.findOneAndUpdate(filter, update, options);
    return result;
  }

  async count (query = {}, options = {}) {
    const result = await this.coll.count(query, options);
    return result;
  }

  async updateOne (filter = {}, update = {}, options = {}) {
    const result = await this.coll.updateOne(filter, update, options);
    return result;
  }

  async updateMany (filter = {}, update = {}, options = {}) {
    const result = await this.coll.updateMany(filter, update, options);
    return result;
  }

  async deleteOne (filter = {}, options = {}) {
    const result = await this.coll.deleteOne(filter, options);
    return result;
  }

  async deleteMany (filter = {}, options = {}) {
    const result = await this.coll.deleteMany(filter, options);
    return result;
  }

  async distinct (key = '', query = {}, options = {}) {
    const result = await this.coll.distinct(key, query, options);
    return result;
  }

  async aggregate (pipeline = {}, options = {}) {
    const result = await this.coll.aggregate(pipeline, options).toArray();
    return result;
  }

  async bulkWrite (operations = [], options = {}) {
    const result = await this.coll.bulkWrite(operations, options);
    return result;
  }
}

module.exports = BaseModel;
