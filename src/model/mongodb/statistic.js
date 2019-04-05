const BaseModel = require('./base');

const DATABASE = 'cms';
const COLLECTION = 'statistic';

class statisticModel extends BaseModel {
  constructor() {
    super(DATABASE, COLLECTION);
  }
}

module.exports = new statisticModel();
