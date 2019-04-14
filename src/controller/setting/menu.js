const utils = require('l-utility');
const createError = require('http-errors');

const service = require('../../service');
const Enum = require('../../common/enum');

class MenuController {
  async save (ctx, next) {
    let { name, url, icon = '', type = Enum.MenuType.ONE_LEVEL, parentId, hasChildren = false } = ctx.request.body;
    if (!url) throw new createError.BadRequest('无效的菜单地址');
    if (!name) throw new createError.BadRequest('无效的菜单名称');
    const exists = await service.setting.menu.exists({ name });
    if (exists) throw new createError.BadRequest('菜单已经存在，请勿重复添加');

    if (parentId) type = Enum.MenuType.TWO_LEVEL;
    if (parentId) parentId = utils.newObjectId(parentId);
    await service.setting.menu.save({ name, url, icon, type, parentId, hasChildren });
    ctx.status = 200;
  }

  async list (ctx, next) {
    const { selector = {}, options = {} } = ctx.request.body;
    if (selector.parentId) selector.parentId = utils.newObjectId(selector.parentId);
    ctx.body = await service.setting.menu.list(selector, options);
  }

  async update (ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的菜单编号');
    let updator = {};
    const { name, url, icon, parentId } = ctx.request.body;
    if (url) updator.url = url;
    if (name) updator.name = name;
    if (icon) updator.icon = icon;
    if (parentId) updator.parentId = utils.newObjectId(parentId);
    await service.setting.menu.update(id, updator);
    ctx.status = 200;
  }

  async remove (ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的文章编号');
    await service.setting.menu.remove(id);
    ctx.status = 200;
  }

  async all (ctx, next) {
    const type = ctx.params.type || Enum.MenuDisplayType.TREE;
    ctx.body = await service.setting.menu.all(type);
  }
}

module.exports = new MenuController();
