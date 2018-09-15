const BaseModel = require('./base');
const mongodb = require('../../database').mongodb;

class UserModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('user');
  }
}

module.exports = new UserModel();
