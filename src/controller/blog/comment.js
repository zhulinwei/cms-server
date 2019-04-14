const utils = require('l-utility');
const createError = require('http-errors');

const service = require('../../service');

class CommentController {
  async list (ctx, next) {
    const articleId = ctx.params.id;
    ctx.body = await service.blog.comment.list(articleId);
  }

  async save (ctx, next) {
    const articleId = ctx.params.id;
    let { uid, nickname, avatar, content, to } = ctx.request.body;
    if (!articleId) throw new createError.BadRequest('无效的文章编号');
    if (!uid) throw new createError.BadRequest('无效的用户编号');
    if (!nickname) throw new createError.BadRequest('无效的用户昵称');
    if (!avatar) throw new createError.BadRequest('无效的用户头像');
    if (!content) throw new createError.BadRequest('无效的评论内容');
    if (to && to._id) to._id = utils.newObjectId(to._id);
    const exists = await service.blog.article.exists({ _id: utils.newObjectId(articleId) });
    if (!exists) throw new createError.BadRequest('无效的文章编号');

    await service.blog.comment.save({ uid, nickname, avatar, articleId, content, to });
    ctx.status = 200;
  }

  async remove (ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的评论编号');
    await service.blog.comment.remove(id);
    ctx.status = 200;
  }
}

module.exports = new CommentController();
