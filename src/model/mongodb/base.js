const mongodb = require('../../database').mongodb;

class BaseModel {
  constructor(database, collection) {
    if (!database) throw new Error('database name is not defined');
    if (!collection) throw new Error('collection name is not defined')
    this.coll = mongodb[database].collection(collection);
  }

  async insertOne(doc, options) {
    doc = doc || {};
    options = options || null;
    return await this.coll.insertOne(doc, options);
  }

  async findOne(query, options) {
    query = query || {};
    options = options || null;
    return await this.coll.findOne(query, options);
  }

  async find(query, options) {
    query = query || {};
    options = options || null;
    return await this.coll.find(query, options).toArray();
  }

  async findOneAndUpdate(filter, update, options) {
    filter = filter || {};
    update = update || {};
    options = options || null;
    return await this.coll.findOneAndUpdate(filter, update, options);
  }

  async count(query, options) {
    query = query || {};
    options = options || null;
    return await this.coll.count(query, options);
  }

  async updateOne(filter, update, options) {
    filter = filter || {};
    update = update || {};
    options = options || null;
    return await this.coll.updateOne(filter, update, options);
  }
  
  async updateMany(filter, update, options) {
    filter = filter || {};
    update = update || {};
    options = options || null;
    return await this.coll.updateMany(filter, update, options);
  }

  async deleteOne(filter, options) {
    return await this.coll.deleteOne(filter, options);
  }
  
  async deleteMany(filter, options) {
    return await this.coll.deleteMany(filter, options);
  }

  async distinct(key, query, options) {
    key = key || '';
    query = query || {};
    options = options || null;
    return await this.coll.distinct(key, query, options);
  }

  async aggregate(pipeline, options) {
    pipeline = pipeline || {};
    options = options || null;
    return await this.coll.aggregate(pipeline, options).toArray();
  }

  async bulkWrite(operations, options) {
    operations = operations || [];
    options = options || null;
    return await this.coll.bulkWrite(operations, options);
  }
}

module.exports = BaseModel;
