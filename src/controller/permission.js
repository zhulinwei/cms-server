const service = require('../service');

class PermissionController {
  async save(ctx, next) {
    const { name, action, source } = ctx.request.body;
    if (!name) throw new Error('无效的权限名称');
    if (!action) throw new Error('无效的权限操作行为');
    if (!source) throw new Error('无效的权限资源地址');
    
    await service.permission.save({ name, action, source });
    ctx.status = 200;
  }

  async list(ctx, next) {
    let { selector = {}, options = {} } = ctx.request.body;
    ctx.body = await service.permission.list(selector, options);
  }

}

module.exports = new PermissionController();
