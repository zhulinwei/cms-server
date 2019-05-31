const utils = require('l-utility');
const service = require('../service');
const createError = require('http-errors');

const debug = require('debug')('cms:contoller:user');

class UserController {
  async setCookies (ctx, next) {
    const user = ctx.state.user;
    if (!user) return;
    const domain = utils.getDomain(ctx.host);
    const expires = new Date(Date.now() + 2 * 3600 * 1000);
    ctx.cookies.set('uid', user.uid, { domain, expires, httpOnly: false, overwrite: true });
    ctx.cookies.set('role', user.role, { domain, expires, httpOnly: false, overwrite: true });

    delete ctx.state.user;
    await next();
  }

  /*
   * 1.检查是否登录成功
   * 2.检查是否为新用户
   * 3.检查是否需重定向
   */
  async login (ctx, next) {
    const passportUser = ctx.state.passport;
    if (!passportUser) throw new createError.BadRequest('无效的用户信息~');

    const isNewUser = await service.user.isNewUser(passportUser);
    if (isNewUser) {
      ctx.state.user = await service.user.saveNewUser(passportUser);
    } else {
      ctx.state.user = await service.user.getUserByPassport(passportUser);
    }

    delete ctx.state.passport;
    await next();

    const referer = ctx.query.state;
    if (referer) return ctx.redirect(referer);
    else ctx.body = ctx.state.user;
  }

  async getUserinfo (ctx, next) {
    const uid = ctx.cookies.get('uid') || ctx.request.body.uid;
    const role = ctx.cookies.get('role') || ctx.request.body.role;
    debug(`uid: ${uid} - role: ${role}`);

    let user = {};
    if (uid && service.role.isUser(role)) user = await service.user.getUserById(uid);
    if (uid && service.role.isTourist(role)) user = await service.user.getTouristById(uid);

    if (!user.uid) {
      user = await service.user.buildTourist();
      ctx.state.user = user;
      await next();
    }
    ctx.body = user;
  }
}
module.exports = new UserController();
