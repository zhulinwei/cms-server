const createError = require('http-errors');

  const utils = require('../../utils');
  const Service = require('../../service')

  class CatalogController {
    async list(ctx, next) {
      const { limit, skip, sort } = ctx.query;
      let selector = {};
      let options = {};
      if (limit) options.limit = limit;
      if (skip) options.skip = skip;
      if (sort) options.sort = sort;
    
      ctx.body = await Service.blog.catalog.list(selector, options);
    }

    async save(ctx, next) {
      let { name, weight } = ctx.request.body;
      if (!name) throw new createError.BadRequest('无效的目录名称');
      weight = parseInt(weight || 0);
      await Service.blog.catalog.save({ name, weight });
    ctx.status = 200;     
  }

  async remove(ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的目录编号');
    await Service.blog.catalog.remove(id);
    ctx.status = 200;     
  }
  
  async update(ctx, next) {
    const id = ctx.params.id;
    const { name, weight } = ctx.request.body;
    if (!id) throw new createError.BadRequest('无效的目录编号');
    if (!name && !weight) throw new createError.BadRequest('无效的目录信息');
    let updator = {};
    if (name) updator.name = name;
    if (weight) updator.weight = weight;
    await Service.blog.catalog.update(id, updator);
    ctx.status = 200;
  }
}

module.exports = new CatalogController();
