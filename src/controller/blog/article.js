const util = require('util');
const createError = require('http-errors');

const utils = require('../../utils');
const Service = require('../../service')

class ArticleController {

  async list(ctx, next) {
    let { selector, options } = ctx.request.body;
    selector = selector || {};
    options = options || { limit: 20 };
    let { count, list } = await Service.blog.article.list(selector, options);
    list = list.map(article => {
      article.thumbnail = utils.addQiniuHost(article.thumbnail);
      return article;
    });
    const residue = utils.residue(count);
    ctx.body = { count, residue, list };

    const result = await Service.blog.article.list(selector, options);
  }

  async nextList(ctx, next) {
    const { catalogId, articleId } = ctx.request.body;
    if (!articleId) throw new createError.BadRequest('无效的文章编号');
    const result = await Service.blog.article.nextList({ catalogId, articleId });

    const list = result.list.map(article => {
      article.thumbnail = utils.addQiniuHost(article.thumbnail);
      return article;
    });
    ctx.body = { residue: utils.residue(result.count), list };
  }

  async detail(ctx, next) {
    const id = ctx.params.id;
    const inc = ctx.query.inc || 0;
    if (!id) throw new createError.BadRequest('无效的文章编号');
    let article = await Service.blog.article.detail(id, inc);
    if (article) article.thumbnail = utils.addQiniuHost(article.thumbnail);
    ctx.body = article;
  }
    
  async save(ctx, next) {
    let { catalogId, title, thumbnail, outline, content, isTop, author } = ctx.request.body;
    if (!catalogId) throw new createError.BadRequest('无效的目录信息');
    if (!title) throw new createError.BadRequest('无效的文章题目');
    if (!thumbnail) throw new createError.BadRequest('无效的文章缩略图');
    if (!outline) throw new createError.BadRequest('无效的文章摘要');
    if (!content) throw new createError.BadRequest('无效的文章内容');
    if (!util.isBoolean(isTop)) throw new createError.BadRequest('无效的置顶信息');
    if (!author) throw new createError.BadRequest('无效的作者信息');
    catalogId = utils.newObjectId(catalogId);
    const exists = await Service.blog.catalog.exists({_id: catalogId });
    if (!exists) throw new createError.BadRequest('不存在的目录信息');
    ctx.body = await Service.blog.article.save({ catalogId, title, thumbnail, outline, content, isTop, author });
  }

  async remove(ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的文章编号');
    await Service.blog.article.remove(id);
    ctx.status = 200;     
  }

  async update(ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的文章编号');
    const { catalogId, title, thumbnail, outline, content, isTop, author } = ctx.request.body;
    let updator = {};
    if (isTop) updator.isTop = isTop;
    if (title) updator.title = title;
    if (author) updator.author = author;
    if (outline) updator.outline = outline;
    if (content) updator.content = content;
    if (thumbnail) updator.thumbnail = utils.removeQiniuHost(thumbnail);
    if (catalogId) updator.catalogId = utils.newObjectId(catalogId);
    await Service.blog.article.update(id, updator);
    ctx.status = 200;
  }

  async comments(ctx, next) {
    const articleId = ctx.params.id;
    if (!articleId) throw new createError.BadRequest('无效的文章编号');
    ctx.body = await Service.blog.article.coments(articleId);
  }
  
  async search(ctx, next) {
    const keyword = ctx.query.keyword;
    if (!keyword) throw new createError.BadRequest('无效的关键字');
    const keywords = keyword.split(' ');
    ctx.body = await Service.blog.article.search(keyword);
  }  
}

module.exports = new ArticleController();
