const utils = require('l-utility');
const service = require('../service');
const createError = require('http-errors');

class AdminController {
  async setCookies (ctx, next) {
    const admin = ctx.state.admin;
    if (!admin) return;
    const domain = utils.getDomain(ctx.host);
    const expires = new Date(Date.now() + 2 * 3600 * 1000);
    ctx.cookies.set('adminId', admin._id, { domain, expires, httpOnly: false, overwrite: true });
    delete ctx.state.admin;
    await next();
  }

  async authentication (ctx, next) {
    const adminId = ctx.cookies.get('adminId') || ctx.request.body.adminId;
    if (!adminId) throw new createError.BadRequest('无效的管理员编号~');
    const admin = await service.admin.getAdmin(adminId);
    if (!admin) throw new createError.BadRequest('无效的管理员信息~');
    if (!this.state) this.state = {};
    this.state.admin = admin;
    this.state.adminId = adminId;
    await next();
  }

  // async authorization (ctx, next) {
  //   await next();
  // }

  // async save (ctx, next) {
  //   const { roles } = ctx.request.body;
  //   if (!roles || roles.length < 1) throw new Error('无效的角色权限');

  //   await service.admin.save({ roles });
  // }

  // async list (ctx, next) {
  //   let { selector = {}, options = {} } = ctx.request.body;
  //   await service.admin.list(selector, options);
  // }

  async login (ctx, next) {
    const { name, password } = ctx.request.body;
    if (!name) throw new createError.BadRequest('无效的管理员名称~');
    if (!password) throw new createError.BadRequest('无效的管理员密码~');
    const admin = await service.admin.login(name, password);
    ctx.status = 200;
    ctx.body = admin;
    ctx.state.admin = admin;
    await next();
  }
}

module.exports = new AdminController();
