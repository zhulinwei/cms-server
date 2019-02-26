const Base = require('./base');
const service = require('../../../service');



class TouristStrategy extends Base {
  constructor() {
    super();
  } 

  async authorize() {
    return await service.user.newTourist(); 
  }

  async authenticate(authorization) {
    // 不需要做任何处理
    return authorization; 
  } 
}

module.exports = TouristStrategy;
