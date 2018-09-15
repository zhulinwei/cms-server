const moment = require('moment');
const Enum = require('../common').enum;
const { redisModel, mongodbModel } = require('../model');

class StatisticService {
  
  __isValid(date) {
    return date === moment().format('YYYY-MM-DD');
  }

  async __baseBasicResult() {
    // 文章总量 
    const articleTotalCount = await mongodbModel.blog.article.count();
    // 当月新增
    const currentMontharticleCount = await mongodbModel.blog.article.count({
      createTime: { $gt: moment().startOf('month') }
    }); 
    // 当月评论量
    const currentMonthCommentResult = await mongodbModel.blog.comment.aggregate([
      { $project: { commentsCount: 1, createTime: 1 } },
      { $match: { createTime: { $gt: moment().startOf('month').toDate() } } },
      { $count: 'count'  }
    ]);
    const currentMonthCommentCount = currentMonthCommentResult && currentMonthCommentResult[0] ? currentMonthCommentResult[0].count : 0;
    // 当月阅读量
    const currentMonthReadResult = await mongodbModel.blog.article.aggregate([
      { $project: { readCount: 1, createTime: 1 } },
      { $match: { createTime: { $gt: moment().startOf('month').toDate() } } },
      { $count: 'count'  }
    ]); 
    const currentMonthReadCount = currentMonthReadResult && currentMonthReadResult[0] ? currentMonthReadResult[0].count : 0;
    return {
      date: moment().format('YYYY-MM-DD'),
      list: [
        { name: '博客文章总量', count: articleTotalCount },
        { name: '文章当月新增', count: currentMontharticleCount },
        { name: '当月阅读数量', count: currentMonthReadCount },
        { name: '当月评论数量', count: currentMonthCommentCount },
      ]
    }; 
  }

  async blogBasic() {
    // 1.先从缓存中获取，后判断是否失效，失效则进行第二步
    // 2.先从statistic表获取，后判断是否失效，失效则进行第三步
    // 3.计算->存储
    const cacheKey = redisModel.cms.keys.bg.BLOG_BASIC;
    const cacheResult = JSON.parse(await redisModel.cms.get(cacheKey));
    if (cacheResult && this.__isValid(cacheResult.date)) return cacheResult.list;
 
    const filter = { type: Enum.StatisticType.BLOG_BASIC };
    let result = await mongodbModel.statistic.findOne(filter);
    
    if (!result || this.__isValid(result.date)) {
      result = await this.__baseBasicResult();
      await mongodbModel.statistic.findOneAndUpdate(filter, result); 
      await redisModel.cms.set(cacheKey, JSON.stringify(result));
    }
    return result.list;
  }

  async __blogArticleResult() {
     const pipeline = [{ 
      $lookup:  {
        from: "blog_article",
        localField: "_id",
        foreignField: "catalogId",
        as: "articles"
      }
    }];
    const result = await mongodbModel.blog.catalog.aggregate(pipeline);
    const list = result.map(item => {
      let model = {
        name: item.name,
        articleCount: item.articles.length
      };
      return model;
    });
    return { date: moment().format('YYYY-MM-DD'), list };
  }


  async blogArticle() {
    const cacheKey = redisModel.cms.keys.bg.BLOG_ACTICLE;
    const cacheResult = JSON.parse(await redisModel.cms.get(cacheKey));
    if (cacheResult && this.__isValid(cacheResult.date)) return cacheResult.list;
   
    const filter = { type: Enum.StatisticType.BLOG_BASIC };
    let result = await mongodbModel.statistic.findOne(filter);
  
    if (!result || this.__isValid(result.date)) {
      result = await this.__blogArticleResult();
      await mongodbModel.statistic.findOneAndUpdate(filter, result); 
      await redisModel.cms.set(cacheKey, JSON.stringify(result));
    }
    return result.list;
  }
}

module.exports = new StatisticService();
