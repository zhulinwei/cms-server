const Router = require('koa-router');

const ctrl = require('../controller');
const middleware = require('../middleware');

class BlogRouter {
  constructor () {
    const router = new Router();
    router.prefix('/api');

    router.get('/users/info', ctrl.user.getUserinfo, ctrl.user.setCookies);
    // 博客管理
    router.get('/blog/catalogs', ctrl.blog.catalog.list);

    router.get('/blog/articles/:id', ctrl.blog.article.detail);
    // 接口可合并
    router.post('/blog/articles/query', ctrl.blog.article.list);
    router.post('/blog/articles/next/query', ctrl.blog.article.nextList);
    router.get('/blog/articles/:id/comments', ctrl.blog.comment.list);
    router.post('/blog/articles/:id/comments', ctrl.blog.comment.save);
    router.get('/blog/search', ctrl.blog.article.search);
    // 博客管理
    router.get('/auth/qq/login', middleware.passport.authorization('qq'), ctrl.user.login, ctrl.user.setCookies);
    router.post('/test', async (ctx, next) => {
      console.log(ctx.request.bdoy);
      ctx.body = { code: 0, success: true };
    });

    return router;
  }
}

module.exports = new BlogRouter();
