const BaseModel = require('../base');

const DATABASE = 'cms';
const COLLECTION = 'blog_article';

class ArticleModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new ArticleModel();
