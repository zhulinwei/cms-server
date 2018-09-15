const BaseModel = require('../base');
const mongodb = require('../../../database').mongodb;

class ArticleModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('blog_article');
  }
}

module.exports = new ArticleModel();
