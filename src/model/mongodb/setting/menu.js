const BaseModel = require('../base');

const DATABASE = 'cms';
const COLLECTION = 'menu';

class MenuModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new MenuModel();
