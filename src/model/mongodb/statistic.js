const BaseModel = require('./base');
const mongodb = require('../../database').mongodb;

class statisticModel extends BaseModel {
  constructor() {
    super();
    this.coll = mongodb.cms.collection('statistic');
  }
}

module.exports = new statisticModel();
