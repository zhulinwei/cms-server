const BaseModel = require('./base');
const mongodb = require('../../database').mongodb;

class AdminModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('admin');
  }
}

module.exports = new AdminModel();
