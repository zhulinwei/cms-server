const service = require('../service');

class AdminController {
 async save(ctx, next) {
    const { roles } = ctx.request.body;
    if (!roles || roles.length < 1) throw new Error('无效的角色权限');
    
    await service.admin.save({ roles });
  }

  async list(ctx, next) {
    let { selector = {}, options = {} } = ctx.request.body;
    await service.admin.list(selector, options);
  } 
}

module.exports = new AdminController();
