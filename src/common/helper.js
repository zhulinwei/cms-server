const crypto = require('crypto');

class Helper {
  constructor() {}

  md5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  sha256(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  newToken(key, value) {
    return this.md5([key, this.md5(value)].join('&'));
  }

  strongPassword(key) {
    return this.sha256(md5(password));
  }
}

module.exports = new Helper();
