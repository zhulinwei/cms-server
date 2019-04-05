const BaseModel = require('./base');

const DATABASE = 'cms';
const COLLECTION = 'user';

class UserModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new UserModel();
