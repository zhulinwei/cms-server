const Router = require('koa-router');

const ctrl = require('../controller');

class BlogRouter {
  constructor() {
    const router = new Router();
    
    router.prefix('/api');
    
    router.get('/users/info', ctrl.user.userinfo);
    // 博客管理
    router.get('/blog/catalogs', ctrl.blog.catalog.list);

    router.get('/blog/articles/:id', ctrl.blog.article.detail);
    router.post('/blog/articles/query', ctrl.blog.article.list);
    router.post('/blog/articles/next/query', ctrl.blog.article.nextList);
    router.get('/blog/articles/:id/comments', ctrl.blog.comment.list);
    router.post('/blog/articles/:id/comments', ctrl.blog.comment.save);
   
    router.get('/blog/search', ctrl.blog.article.search);
    // 博客管理

    router.get('/auth/:type/login', ctrl.user.authenticate, ctrl.user.login, ctrl.user.setCookies);

    return router;
  }
}

  module.exports = new BlogRouter();
