const utils = require('../../utils');
const mongodbModel = require('../../model').mongodbModel;

class CommentService {
  async exists(query, options) {
    const count = await mongodbModel.blog.comment.count(query, options);
    return count && count > 0;
  }

  async list(articleId) {
    let selector = {};
    if (articleId) selector.articleId = utils.newObjectId(articleId);
    const options = { 
      sort: { _id: -1 },
      limit: 20 
    };
    const [ count, commentList ] = await Promise.all([
      mongodbModel.blog.comment.count(selector),
      mongodbModel.blog.comment.find(selector, options),
    ]);
    const list = await Promise.all(commentList.map(async comment => {
      let selector = { _id: comment.articleId };
      let options = { fields: { title: 1 } };
      comment.article = await mongodbModel.blog.article.findOne(selector, options) || { title: '' };
      return comment;
    }));
    return { count, list };
  }

  async save(body) {
    let doc = {
      uid: utils.newObjectId(body.uid),
      articleId: utils.newObjectId(body.articleId),
      avatar: body.avatar,
      nickname: body.nickname,
      content: body.content,
      createTime: new Date()
    };
    if (body.to && body.to.uid) {
      let to = Object.assign({}, body.to);
      to.uid = utils.newObjectId(to.uid);
      doc.to = to;
    }
    await mongodbModel.blog.comment.insertOne(doc);
  }

  async update(id, body) {
    const filter = { _id: utils.newObjectId(id) };
    const update = Object.assign({
      updateTime: new Date()
    }, body);

    await mongodbModel.blog.comment.updateOne(filter, { $set: update });
  }

  async remove(id) {
    await mongodbModel.blog.comment.deleteOne({ _id: utils.newObjectId(id) });
  }
}

module.exports = new CommentService();
