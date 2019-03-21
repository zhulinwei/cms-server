const BaseModel = require('../base');

const DATABASE = 'cms';
const COLLECTION = 'blog_comment';

class CommentModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new CommentModel();
