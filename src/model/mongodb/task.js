const BaseModel = require('./base');

const DATABASE = 'cms';
const COLLECTION = 'task';

class TaskModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new TaskModel();
