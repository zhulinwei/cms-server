const BaseModel = require('./base');
const mongodb = require('../../database').mongodb;

class PermissonModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('permisson');
  }
}

module.exports = new PermissonModel();
