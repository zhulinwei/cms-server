const BaseModel = require('../base');
const mongodb = require('../../../database').mongodb;

class CatalogModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('blog_catalog');
  }
}

module.exports = new CatalogModel();
