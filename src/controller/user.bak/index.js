// const _ = require('lodash');
const utils = require('../../utils');
// const Enum = require('../../common').enum;
// const configs = require('../../configs');
const service = require('../../service');
const createError = require('http-errors');
// const Authenticator = require('./strategies');

class UserController {
  async setCookies (ctx, next) {
    const user = ctx.state.user;
    if (!user) return;
    const domain = utils.getDomain(ctx.host);
    const expires = new Date(Date.now() + 2 * 3600 * 1000);
    ctx.cookies.set('uid', user.uid, { domain, expires, httpOnly: false, overwrite: true });
    ctx.cookies.set('role', user.role, { domain, expires, httpOnly: false, overwrite: true });
    await next();
  }

  async login (ctx, next) {
    const referer = ctx.query.referer;
    if (referer) return ctx.redirect(referer);
    ctx.body = ctx.state.user;
  }

  async getAuthorizeUrl (ctx, next) {
    const type = ctx.params.type;
    ctx.body = service.user.getAuthorizeUrl(type);
  }

  // async userinfo (ctx, next) {
  //   const uid = ctx.cookies.get('uid') || ctx.request.body.uid;
  //   const role = ctx.cookies.get('role') || ctx.request.body.role;
  //   if (!uid || !role) return ctx.redirect('/api/auth/tourist/login');
  //   let user = {};
  //   if (![ Enum.UserRoleType.USER, Enum.UserRoleType.TOURIST ].includes(role)) throw new createError.BadRequest('无效的用户信息');
  //   if (role === Enum.UserRoleType.USER) user = await service.user.userinfo(uid);
  //   else user = await service.user.touristInfo(uid);
  //   ctx.body = user;
  // }

  authorization (ctx, next) {
    const user = ctx.state.passport;
    if (!user) throw new createError.BadRequest('无效的用户信息~');
    if (server.user.isNewUser(user)) server.user.register(user);
    ctx.body = user;
  }
}

module.exports = new UserController();
