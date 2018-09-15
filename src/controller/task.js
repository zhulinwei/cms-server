const Enum = require('../common/enum');
const Service = require('../service');

class TaskController {
  async list(ctx, next) {
    let { selector, options } = ctx.request.body;
    selector = selector || {};
    options = options || { limit: 20 };
    ctx.body = await Service.task.list(selector, options);
  }

  async save(ctx, next) {
    const { name, nominee } = ctx.request.body;
    if (!name) throw new createError.BadRequest('无效的任务名称');
    if (!nominee) throw new createError.BadRequest('无效的任务完成者');

    await Service.task.save({ name, nominee });
    ctx.status = 200;
  }

  async update(ctx, next) {
    const id = ctx.params.id;
    const { name, nominee, status } = ctx.request.body;
    if (!id) throw new createError.BadRequest('无效的任务编号');
    let updator = {};
    if (name) updator.name = name;
    if (nominee) updator.nominee = nominee;
    if (status || status === Enum.TaskStatusType.INIT) updator.status = status;
    await Service.task.update(id, updator);
    ctx.status = 200;
  }
  
  async remove(ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的任务编号');
    await Service.task.remove(id);
    ctx.status = 200;     
  }
}

module.exports = new TaskController();
