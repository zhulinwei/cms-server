const passport = require('l-passport');
const { qq } = require('../configs').authorization;

passport.initialize({
  provider: 'qq',
  appId: qq.appId,
  appSecret: qq.appKey,
  redirect: qq.redirect
});

module.exports = passport;
