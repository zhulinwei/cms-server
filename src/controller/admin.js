const service = require('../service');
const createError = require('http-errors');

class AdminController {
  async authentication (ctx, next) {
    // const adminId = ctx.cookies.get('adminId') || ctx.request.body.adminId;
    const adminId = '5cb1d77eb0b68860328ee762';
    if (!adminId) throw new createError.BadRequest('无效的管理员编号~');
    const admin = await service.admin.getAdmin(adminId);
    if (!admin) throw new createError.BadRequest('无效的管理员信息~');
    if (!this.state) this.state = {};
    this.state.admin = admin;
    this.state.adminId = adminId;
    await next();
  }

  async authorization (ctx, next) {
    await next();
  }

  async save (ctx, next) {
    const { roles } = ctx.request.body;
    if (!roles || roles.length < 1) throw new Error('无效的角色权限');

    await service.admin.save({ roles });
  }

  async list (ctx, next) {
    let { selector = {}, options = {} } = ctx.request.body;
    await service.admin.list(selector, options);
  }
}

module.exports = new AdminController();
