const BaseModel = require('./base');
const mongodb = require('../../database').mongodb;

class TaskModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('task');
  }
}

module.exports = new TaskModel();
