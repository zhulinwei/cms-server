const utils = require('../../utils');
const Enum = require('../../common/enum');
const mongodbModel = require('../../model').mongodbModel;

class MenuService {
  async list(selector = {}, options = {}) {
    const [ count, list ] = await Promise.all([
      mongodbModel.setting.menu.count(selector),
      mongodbModel.setting.menu.find(selector, options),
    ]);
    return { count, list };
  }

  async exists(query = {}, options = {}) {
    const count = await mongodbModel.setting.menu.count(query, options);
    return count && count > 0;
  }

  async save (body) {
    const { name, url, icon, type, parentId, hasChildren } = body;
    await mongodbModel.setting.menu.insertOne({ name, url, icon, type, parentId, hasChildren, createTime: new Date() });
  }
  
  async update(id, body) {
    const filter = { _id: utils.newObjectId(id) };
    const update = Object.assign({
      updateTime: new Date()
    }, body);
    await mongodbModel.setting.menu.updateOne(filter, { $set: update });
  }
  
  async remove(id) {
    await mongodbModel.setting.menu.deleteOne({ _id: utils.newObjectId(id) });
  }

  async all(type = Enum.MenuDisplayType.TREE) {
    const menus = await mongodbModel.setting.menu.find({ type: Enum.MenuType.ONE_LEVEL });
    return await Promise.all(menus.map(async menu => {
      menu.subMenus = await mongodbModel.setting.menu.find( { parentId: menu._id }) || [];
      return menu;
    }));
  }
}

module.exports = new MenuService();
