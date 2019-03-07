console.log('in123');
const service = require('../../service');

class MenuController {
 async save(ctx, next) {
    const { roles } = ctx.request.body;
    if (!roles || roles.length < 1) throw new Error('无效的角色权限');
    
    await service.admin.save({ roles });
  }

  async list(ctx, next) {
    let { selector = {}, options = {} } = ctx.request.body;
    ctx.body = await service.setting.menu.list(selector, options);
  } 
}

module.exports = new MenuController();
