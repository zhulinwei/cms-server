const Enum = require('../common/enum');
const service = require('../service');

class TaskController {
  async list(ctx, next) {
    let { selector = {}, options = { limit: 20 }} = ctx.request.body;
    ctx.body = await service.task.list(selector, options);
  }

  async save(ctx, next) {
    const { name, nominee } = ctx.request.body;
    if (!name) throw new createError.BadRequest('无效的任务名称');
    if (!nominee) throw new createError.BadRequest('无效的任务完成者');

    await service.task.save({ name, nominee });
    ctx.status = 200;
  }

  async update(ctx, next) {
    const id = ctx.params.id;
    const { name, nominee, status } = ctx.request.body;
    if (!id) throw new createError.BadRequest('无效的任务编号');
    let updator = {};
    if (name) updator.name = name;
    if (nominee) updator.nominee = nominee;
    if (status || status === Enum.TaskStatusType.INIT) updator.status = parseInt(status);
    await service.task.update(id, updator);
    ctx.status = 200;
  }
  
  async remove(ctx, next) {
    const id = ctx.params.id;
    if (!id) throw new createError.BadRequest('无效的任务编号');
    await service.task.remove(id);
    ctx.status = 200;     
  }
}

module.exports = new TaskController();
