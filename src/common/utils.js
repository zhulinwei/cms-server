const fs = require('fs');
const crypto = require('crypto');
const archiver = require('archiver');

class Utils {
  md5 (content) {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  sha256 (content) {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  newToken (key, value) {
    return this.md5([key, this.md5(value)].join('&'));
  }

  strongPassword (key) {
    // return this.sha256(md5(password));
  }

  zipFolder (dirpath, destpath) {
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
    archive.directory(dirpath, false);
    archive.pipe(fs.createWriteStream(destpath));
    return archive.finalize();
  }
}

module.exports = new Utils();
