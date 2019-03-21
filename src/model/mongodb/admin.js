const BaseModel = require('./base');

const DATABASE = 'cms';
const COLLECTION = 'admin';

class AdminModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new AdminModel();
