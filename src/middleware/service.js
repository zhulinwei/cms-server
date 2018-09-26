const koaBody = require('koa-body');
const createError = require('http-errors');

class ServiceMiddelware {
  async notFound(ctx, next) {
    console.log(ctx.url, ctx.method);
    await next();
    if (ctx.status === 404) ctx.body = ctx.body || { code: 404, message: '资源不存在' };
    else ctx.body = ctx.body || { code: 200, message: '请求成功' };
  }

  async exception(ctx, next) {
    try {
      await next();
    } catch(err) {
      console.log(err);
      if (err instanceof createError.HttpError && err.expose) {
        ctx.status = err.status;
        ctx.body = Object.assign({ code: 400 }, err) 
      } else {
        // TODO 微信提醒
        ctx.status = 500;
        ctx.body = { code: 500, message: '服务器繁忙，请稍后重试' };
      } 
    }
  }

  async bodyParser(ctx, next) {
    await koaBody({    
      multipart: true,
      onerror: (err, ctx) => ctx.throw(422, '请求内容格式错误')
    })(ctx, next);
  }
}

module.exports = new ServiceMiddelware();
