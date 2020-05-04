const utils = require('l-utility');
const createError = require('http-errors');
const mongodbModel = require('../model').mongodbModel;

const debug = require('debug')('cms:service:admin');

class AdminService {
  _encryptPassword (password) {
    const weekPassword = utils.md5(password);
    const strongPassword = utils.sha256(`cms:${weekPassword}:123`);
    return strongPassword;
  }

  async login (name, password) {
    const admin = await mongodbModel.admin.findOne({ name });
    if (!admin) throw new createError.BadRequest('用户昵称不正确~');
    const encryptedPassword = this._encryptPassword(password);
    debug(`name: ${name} - password: ${password} - encryptedPassword: ${encryptedPassword}`);
    if (encryptedPassword !== admin.password) throw new createError.BadRequest('用户密码不正确~');
    return admin;
  }

  async getAdminById (id) {
    const admin = await mongodbModel.admin.findOne({ _id: utils.newObjectId(id) });
    return admin;
  }
  // async exists (query, options) {
  //   const count = await mongodbModel.blog.article.count(query, options);
  //   return count && count > 0;
  // }

  // async list (selector, options) {
  //   const [ count, list ] = await Promise.all([
  //     mongodbModel.blog.article.count(selector),
  //     mongodbModel.blog.article.find(selector, options)
  //   ]);
  //   return { count, list };
  // }

  // async nextList (body) {
  //   let selector = {
  //     isTop: body.isTop || false,
  //     _id: { $lt: utils.newObjectId(body.articleId) }
  //   };
  //   if (body.catalogId) selector.catalogId = utils.newObjectId(body.catalogId);

  //   const options = {
  //     limit: 20,
  //     sort: { _id: -1 },
  //     fields: { title: 1, catalogId: 1, thumbnail: 1, outline: 1, commentsCount: 1, readCount: 1 }
  //   };

  //   const [ count, list ] = await Promise.all([
  //     mongodbModel.blog.article.count(selector),
  //     mongodbModel.blog.article.find(selector, options)
  //   ]);
  //   return { count, list };
  // }

  // async detail (id, inc) {
  //   const selector = { _id: utils.newObjectId(id) };
  //   const article = await mongodbModel.blog.article.findOne(selector);
  //   if (inc) await mongodbModel.blog.article.updateOne(selector, { $inc: { readCount: parseInt(inc) } });
  //   return article;
  // }

  // async save (body) {
  //   const result = await mongodbModel.blog.article.insertOne({
  //     catalogId: utils.newObjectId(body.catalogId),
  //     title: body.title,
  //     author: body.author,
  //     outline: body.outline,
  //     content: body.content,
  //     thumbnail: body.thumbnail,
  //     isTop: body.isTop || false,
  //     readCount: 0,
  //     commentsCount: 0,
  //     createTime: new Date()
  //   });
  //   return { articleId: result.insertedId };
  // }

  // async update (id, body) {
  //   const filter = { _id: utils.newObjectId(id) };
  //   const update = Object.assign({
  //     updateTime: new Date()
  //   }, body);
  //   await mongodbModel.blog.article.updateOne(filter, { $set: update });
  // }

  // async remove (id) {
  //   await mongodbModel.blog.article.deleteOne({ _id: utils.newObjectId(id) });
  // }

  // async search (keyword) {
  //   const regexps = keyword.split(' ').map(keyword => {
  //     return [
  //       { title: new RegExp(keyword) },
  //       { content: new RegExp(keyword) }
  //     ];
  //   });
  //   // regexps的格式为[ [{title, content}], [{title, content}, ...]]，因此需要进行数组降维
  //   const selector = { $or: [].concat.apply([], regexps) };
  //   const options = {
  //     limit: 20,
  //     fields: { title: 1, outline: 1 }
  //   };
  //   const [ count, list ] = await Promise.all([
  //     mongodbModel.blog.article.count(selector),
  //     mongodbModel.blog.article.find(selector, options)
  //   ]);
  //   return { count, list };
  // }
}

module.exports = new AdminService();
