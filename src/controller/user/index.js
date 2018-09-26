const _ = require('lodash');
const utils = require('../../utils');
const Enum = require('../../common').enum;
const configs = require('../../configs');
const Service = require('../../service');
const Authenticator = require('./strategies');

class UserController {
  async setCookies(ctx, next) {
    const user = ctx.state.user;
    if (!user) return;
    const domain = utils.getDomain(ctx.host);
    const expires = new Date(Date.now() + 2 * 3600 * 1000);
    ctx.cookies.set('uid', user.uid, { domain, expires, httpOnly: false, overwrite: true });
    ctx.cookies.set('role', user.role, { domain, expires, httpOnly: false, overwrite: true });
    await next();
  }

  async userinfo(ctx, next) {
    const uid = ctx.cookies.get('uid') || ctx.request.body.uid;
    const role = ctx.cookies.get('role') || ctx.request.body.role;
    if (!uid || !role) return ctx.redirect('/api/auth/tourist/login');
    let user = {};
    if (![ Enum.UserRoleType.USER, Enum.UserRoleType.TOURIST ].includes(role)) throw createError.BadRequest('无效的用户信息');
    if (role === Enum.UserRoleType.USER) user = await Service.user.userinfo(uid);
    else user = await Service.user.touristInfo(uid);
    ctx.body = user;
  }

  async authenticate(ctx, next) {
    const { type } = ctx.params;
    const exists =  _.some(Object.keys(Authenticator.strategies), strategy => strategy === type);
    if (!exists) throw Error('无效的登陆类型！');
    const Strategy = Authenticator.strategies[type];
    let config = {};
    if (configs.authorization && configs.authorization[type]) 
      config = Object.assign(config, configs.authorization[type]);
    const strategy = new Strategy(config);
    const options = {
      url: ctx.href,
      query: ctx.query,
      params: ctx.params,
      body: ctx.request.body
    };
    ctx.state.user = await strategy.execute(options);
    await next();
  }

  async login(ctx, next) {

    const referer = ctx.query.referer;
    if (referer) return ctx.redirect(referer);
    ctx.body = ctx.state.user; 
  }
}

module.exports = new UserController();
