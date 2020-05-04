const passport = require('l-passport');
const authorization = require('../configs').authorization;

passport.initialize({
  provider: 'qq',
  appId: authorization.qq.appId,
  appSecret: authorization.qq.appKey,
  redirect: authorization.qq.redirect
});

module.exports = passport;
