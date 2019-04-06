const qiniu = require('qiniu'); 

const utils = require('../utils');
const config = require('../configs').qiniu;

class QiniuService { 
  constructor () {
    this.host = config.host;
    this.bucket = config.bucket;
    this.qiniuConfig = new qiniu.conf.Config();
    this.mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
  }

  key (type) {
    const prefix = type || 'cms';
    return `${prefix}/${utils.newObjectId()}`; 
  }

  token (type) {
    const key = this.key(type);
    const options = { scope: `${this.bucket}:${key}`, expires: 7200 };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(this.mac);
    return { key, token };
  }

  //  拉取网络资源并存储至空间
  fetch (url, key) {
    const bucketManager = new qiniu.rs.BucketManager(this.mac, this.qiniuConfig);
    return new Promise((resolve, reject) => {
      bucketManager.fetch(url, this.bucket, key, (err, body, info) => {
        if (err) reject(err);
        return resolve(body);
      });
    });
  }

  // 批量获取文件信息
  async batchGainFileInfo(files) {
    if (!files || files.length < 1) throw new Error('无效的文件名');
    if (files.length > 1000) throw new Error('文件数量超出限制');
    const statOperations = files.map(file => qiniu.rs.statOp(this.bucket, file));
    const bucketManager = new qiniu.rs.BucketManager(this.mac, this.qiniuConfig);
    return new Promise((resolve, reject) => {
      bucketManager.batch(statOperations, (err, body, info)  => {
        if (err) reject(err);
        return resolve(body);
      });
    });
  };

  // 服务器上传
  upload(readStream) {
    const { key, token } = this.token();
    const putExtra = new qiniu.form_up.PutExtra();
    const formUploader = new qiniu.form_up.FormUploader(this.qiniuConfig);
    return new Promise((resolve, reject) => {
      formUploader.putStream(token, key, readStream, putExtra, (err, body, info) => {
        if (err) reject(err);
        return resolve(body);
      });
    });
  }
}

module.exports = new QiniuService();
