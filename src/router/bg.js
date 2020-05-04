const Router = require('koa-router');

const ctrl = require('../controller');

class BgRouter {
  constructor () {
    const router = new Router();

    router.prefix('/bg');

    router.post('/admin/login', ctrl.admin.login, ctrl.admin.setCookies);

    // 登录验证与授权验证
    // router.get('/', ctrl.admin.authentication, ctrl.admin.authorization);
    // router.post('/', ctrl.admin.authentication, ctrl.admin.authorization);

    // 博客管理开始
    router.get('/blog/catalogs', ctrl.blog.catalog.list);
    router.post('/blog/catalogs', ctrl.blog.catalog.save);
    router.put('/blog/catalogs/:id', ctrl.blog.catalog.update);
    router.delete('/blog/catalogs/:id', ctrl.blog.catalog.remove);

    router.get('/blog/articles/:id', ctrl.blog.article.detail);
    router.post('/blog/articles/query', ctrl.blog.article.list);
    router.post('/blog/articles', ctrl.blog.article.save);
    router.put('/blog/articles/:id', ctrl.blog.article.update);
    router.delete('/blog/articles/:id', ctrl.blog.article.remove);

    router.post('/blog/comments/query', ctrl.blog.comment.list);
    router.post('/blog/articles/:id/comments', ctrl.blog.comment.save);
    router.delete('/blog/comments/:id', ctrl.blog.comment.remove);

    // 博客管理结束
    // 任务管理开始
    router.post('/tasks/query', ctrl.task.list);
    router.post('/tasks', ctrl.task.save);
    router.put('/tasks/:id', ctrl.task.update);
    router.delete('/tasks/:id', ctrl.task.remove);
    // 任务管理结束

    router.get('/qiniu/token', ctrl.qiniu.token);
    router.post('/qiniu/upload', ctrl.qiniu.upload);

    router.get('/statistics/blog', ctrl.statistic.blog);

    router.post('/settings/menus', ctrl.setting.menu.save);
    router.get('/settings/menus/all', ctrl.setting.menu.all);
    router.post('/settings/menus/query', ctrl.setting.menu.list);
    router.put('/settings/menus/:id', ctrl.setting.menu.update);
    router.delete('/settings/menus/:id', ctrl.setting.menu.remove);

    router.get('/backups/cms/download', ctrl.backup.downloadDataOfCms);
    router.post('/test', async (ctx, next) => {
      console.log(ctx.request.bdoy);
      ctx.body = { code: 0, success: true };
    });

    return router;
  }
}

module.exports = new BgRouter();
