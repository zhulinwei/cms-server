const BaseModel = require('../base');
const mongodb = require('../../../database').mongodb;

class CommentModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('blog_comment');
  }
}

module.exports = new CommentModel();
