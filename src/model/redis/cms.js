const BaseModel = require('./base');
const redis = require('../../database').redis;

const keys = {
  bg: {
    BLOG_BASIC: 'blog_basic',
    BLOG_ACTICLE: 'blog_acticle'
  }
};

class CmsModel extends BaseModel {
  constructor() {
    super();
    this.keys = keys;
    this.client = redis.cms;
  }
}

module.exports = new CmsModel();
