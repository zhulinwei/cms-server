const createError = require('http-errors');

const utils = require('../utils');
const Service = require('../service');

class StatisticController {
  async blog(ctx, next) {
    const basics = await Service.statistic.blogBasic();
    const articles = await Service.statistic.blogArticle();
    ctx.body = { basics, articles };
  }
}

module.exports = new StatisticController();
