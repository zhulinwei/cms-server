const utils = require('l-utility');
const Enum = require('../common').enum;
const mongodbModel = require('../model').mongodbModel;

class RoleService {
  constructor () {
    this.roleTypes = {
      USER: Enum.UserRoleType.USER,
      GUEST: Enum.UserRoleType.GUEST,
      ADMIN: Enum.UserRoleType.ADMIN,
      TOURIST: Enum.UserRoleType.TOURIST,
      SUPER_ADMIN: Enum.UserRoleType.SUPER_ADMIN
    };
  }

  isUser (role = '') { return role === this.roleTypes.USER; }

  isGuest (role = '') { return role === this.roleTypes.GUEST; }

  isAdmin (role = '') { return role === this.roleTypes.ADMIN; }

  isTourist (role = '') { return role === this.roleTypes.TOURIST; }

  isSuperAdmin (role = '') { return role === this.roleTypes.SUPER_ADMIN; }

  async findOne (selector, options) {
    const result = await mongodbModel.role.findOne(selector, options);
    return result;
  }

  async save (body) {
    const name = body.name;
    const permissions = body.permissions.map(permission => utils.newObjectId(permission));
    const result = await mongodbModel.role.coll.insertOne({ name, permissions });
    return result;
  }

  async list (selector, options) {
    selector = selector || {};
    options = options || {};
    const result = await mongodbModel.role.coll.find(selector, options).toArray();
    return result;
  }

  // 用于在入口判断用户是否有资格操作资源
  // async hasRole(role) {
  //   const count = await Model.role.count({ name: role });
  //   return count > 0;
  // }
}

module.exports = new RoleService();
