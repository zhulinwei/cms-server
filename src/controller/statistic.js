const createError = require('http-errors');

const utils = require('../utils');
const service = require('../service');

class StatisticController {
  async blog(ctx, next) {
    const basics = await service.statistic.blogBasic();
    const articles = await service.statistic.blogArticle();
    ctx.body = { basics, articles };
  }
}

module.exports = new StatisticController();
