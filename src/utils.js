const moment = require('moment');
const mongodb = require('mongodb');
const createError = require('http-errors');

const configs = require('./configs');

class Utils {
  md5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  sha256(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  newObjectId(id) {
    try {
      return new mongodb.ObjectId(id);
    } catch(err) {
      throw new createError.BadRequest('the id length must be 24');
    }
  }

  objectIdToDate(id) {
    if (!id || typeof id !== 'string' || id.length !== 24) throw createError.BadRequest('无效的ID');
    return this.newObjectId(id).getTimestamp();
  }

  dateToObjectId(date) {
    return this.newObjectId(`${moment(date).unix().toString(16)}0000000000000000`);
  }

  residue(count, limit) { 
    limit = limit || 20;
    return Math.max(count - limit, 0); 
  }

  addQiniuHost(key) {
    return `${configs.qiniu.host}/${key}`;
  }

  removeQiniuHost(key) {
    return key.replace(`${configs.qiniu.host}/`, '');
  }

  getDomain(host) {
    const localhost = 'localhost';
    // host可能存在的值：localhost、51linwei.top、51linwei.top:3451
    return host.includes(localhost) ? localhost : host.split(':')[0];
  }
}

module.exports = new Utils();

