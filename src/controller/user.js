const utils = require('l-utility');
const service = require('../service');
const createError = require('http-errors');

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

  async authorization (ctx, next) {
    const user = ctx.state.passport;
    console.log(user);
    if (!user) throw new createError.BadRequest('无效的用户信息~');
    const isNewUser = await service.user.isNewUser(user);
    console.log(isNewUser);
    if (isNewUser) await service.user.register(user);
    ctx.body = user;
  }
}
module.exports = new UserController();
