const utils = require('l-utility');
const moment = require('moment');
const Enum = require('../common/enum');
const qiniuService = require('./qiniu');
const redisModel = require('../model').redisModel;
const mongodbModel = require('../model').mongodbModel;

class UserService {
  async _format (user) {
    if (!user) return {};
    return {
      uid: user._id,
      avatar: qiniuService.addHost(user.avatar),
      nickname: user.nickname,
      role: Enum.UserRoleType.USER
    };
  }

  async isNewUser (passportUser) {
    const selector = { provider: passportUser.provider, openId: passportUser.uid };
    const count = await mongodbModel.user.count(selector);
    return count < 1;
  }

  async saveNewUser (passportUser) {
    const token = utils.md5(passportUser.uid);
    const avatarKey = qiniuService.key('user');
    await qiniuService.fetch(passportUser.avatar, avatarKey);
    const selector = { openId: passportUser.uid, provider: passportUser.provider };
    const user = Object.assign({ body: passportUser.body }, {
      token,
      openId: passportUser.uid,
      avatar: avatarKey,
      provider: passportUser.provider,
      nickname: passportUser.nickname
    });
    await mongodbModel.user.findOneAndUpdate(selector, { $set: user }, { upsert: true, returnOrignal: false });
    return this._format(user);
  }

  async getUserByPassport (passportUser) {
    const selector = { openId: passportUser.uid, provider: passportUser.provider };
    const user = await mongodbModel.user.findOne(selector);
    return this._format(user);
  }

  async getUserById (uid) {
    const user = await mongodbModel.user.findOne({ _id: utils.newObjectId(uid) });
    return this._format(user);
  }

  async getTouristById (uid) {
    const tourist = await redisModel.cms.get(uid);
    if (!tourist) return {};
    return JSON.parse(tourist);
  }

  async buildTourist () {
    const tourist = {
      uid: utils.newObjectId(),
      role: Enum.UserRoleType.TOURIST,
      nickname: `游客_${moment().unix().toString(16)}`
    };
    await redisModel.cms.setex(tourist.uid.toString(), 2 * 60 * 60, JSON.stringify(tourist));
    return tourist;
  }
}

module.exports = new UserService();
