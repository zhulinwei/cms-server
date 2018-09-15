module.exports = {
  server: {
    development: process.env.NODE_ENV === 'development',
    production: process.env.NODE_ENV === 'production',
    hostname: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT || '3451',
  },
  mongodb: {
    cms: {
      url: process.env.MONGODB_CMS || 'mongodb://localhost:27017',
      options: {}
    },
    // passport: {
    //   url: process.env.MONGODB_PASSPORT || 'mongodb://localhost:27017',
    //   options: {}
    // }
  },
  redis: {
    cms: {
      url: process.env.REDIS_CMS || 'redis://localhost:6379/0'
    }
  },
  qiniu: {
    host: process.env.QINIU_HOST,
    bucket: process.env.QINIU_BUCKET,
    accessKey: process.env.QINIU_ACCESS_KEY,
    secretKey: process.env.QINIU_SECRET_KEY,
  },
  authorization: {
    qq: {
      appId: process.env.QQ_WEB_APPID,
      appKey: process.env.QQ_WEB_APPKEY   
    },
  },
  userDefaultAvatat: process.env.USER_DEFAULT_AVATAR || 'test/5b39e12b24556e0de4a778b8',
  mail: {
    host: process.env.MAIL_HOST || '',
    port: process.env.MAIL_PORT || 465,
    user: process.env.MAIL_USER || '',
    password: process.env.MAIL_PASSWORD || '', 
  }
};
