const Enum = require('../common').enum;
const utils = require('../utils');
const moment = require('moment');
const configs = require('../configs');
const redisModel = require('../model').redisModel;
const mongodbModel = require('../model').mongodbModel;

class UserService {
  constructor() {}

  async __format(user) {
    if (!user) return {};
    return {
      uid: user._id,
      avatar: utils.addQiniuHost(user.avatar),
      nickname: user.nickname,
      role: Enum.UserRoleType.USER
    };
  }

  async findOneWithFormat(selector) {
    const user = await mongodbModel.user.findOne(selector);
    return this.__format(user);
  }

  async register(body) {
    const selector = { openId: body.openId, provider: body.provider };
    const user = await mongodbModel.user.findOneAndUpdate(selector, { $set: body }, { upsert: true, returnOrignal: false }); 
    return this.__format(user);
  }

  async userinfo(uid) {
    const user = await mongodbModel.user.findOne({ _id: utils.newObjectId(uid) });
    return this.__format(user);
  }

  async newTourist() {
    const tourist = {
      avatar: '',
      uid: utils.newObjectId(),
      role: Enum.UserRoleType.TOURIST,
      nickname: `游客_${moment().unix().toString(16)}`
    };
    // 缓存游客信息，时长为2小时
    await redisModel.cms.setex(tourist.uid.toString(), 2 * 60 * 60 ,JSON.stringify(tourist))
    return tourist;
  }

  async touristInfo(uid) {
    const tourist = await redisModel.cms.get(uid); 
    if (!tourist) return {};
    return JSON.parse(tourist);
  }
}

module.exports = new UserService();
