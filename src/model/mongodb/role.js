const BaseModel = require('./base');
const mongodb = require('../../database').mongodb;

class RoleModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('role');
  }
}

module.exports = new RoleModel();
