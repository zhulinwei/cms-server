
const utils = require('l-utility');
const common = require('../common');
const qiniuService = require('./qiniu');
// const redisModel = require('../model').redisModel;
const mongodbModel = require('../model').mongodbModel;
const { Enum } = common;

class UserService {
  async isNewUser (user) {
    const selector = { provider: user.provider, openId: user.uid };
    const count = await mongodbModel.user.count(selector);
    return count < 1;
  }

  async register (user) {
    const token = utils.md5(user.uid);
    const avatarKey = qiniuService.key('user');
    await qiniuService.fetch(user.avatar, avatarKey);
    const selector = { openId: user.uid, provider: user.provider };
    const newUser = Object.assign({
      token,
      openId: user.uid,
      avatar: avatarKey,
      provider: user.provider,
      nickname: user.nickname
    }, user.body);
    const result = await mongodbModel.user.findOneAndUpdate(selector, { $set: newUser }, { upsert: true, returnOrignal: false });
    console.log(result);
    return this._format(newUser);
  }

  async _format (user) {
    if (!user) return {};
    return {
      uid: user._id,
      avatar: utils.addQiniuHost(user.avatar),
      nickname: user.nickname,
      role: Enum.UserRoleType.USER
    };
  }

  // async findOneWithFormat (selector) {
  //   const user = await mongodbModel.user.findOne(selector);
  //   return this._format(user);
  // }

  // async userinfo (uid) {
  //   const user = await mongodbModel.user.findOne({ _id: utils.newObjectId(uid) });
  //   return this._format(user);
  // }

  // async newTourist () {
  //   const tourist = {
  //     avatar: '',
  //     uid: utils.newObjectId(),
  //     role: Enum.UserRoleType.TOURIST,
  //     nickname: `游客_${moment().unix().toString(16)}`
  //   };
  //   // 缓存游客信息，时长为2小时
  //   await redisModel.cms.setex(tourist.uid.toString(), 2 * 60 * 60, JSON.stringify(tourist));
  //   return tourist;
  // }

  // async touristInfo (uid) {
  //   const tourist = await redisModel.cms.get(uid);
  //   if (!tourist) return {};
  //   return JSON.parse(tourist);
  // }
}

module.exports = new UserService();
