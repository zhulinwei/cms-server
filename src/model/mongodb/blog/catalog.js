const BaseModel = require('../base');

const DATABASE = 'cms';
const COLLECTION = 'blog_catalog';

class CatalogModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new CatalogModel();
