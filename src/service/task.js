const utils = require('../utils');
const Enum = require('../common/enum');
const mongodbModel = require('../model').mongodbModel;

class TaskService {
  async list(selector, options) {
    const [ count, list ] = await Promise.all([
      mongodbModel.task.count(selector),
      mongodbModel.task.find(selector, options),
    ]);
    return { count, list };
  }

  async save(body) {
    const doc = {
      name: body.name,
      nominee: body.nominee,
      createTime: new Date(),
      status: Enum.TaskStatusType.INIT
    };
    await mongodbModel.task.insertOne(doc);
  }

  async update(id, body) {
    const filter = { _id: utils.newObjectId(id) };
    const update = Object.assign({
      updateTime: new Date()
    }, body);
    await mongodbModel.task.updateOne(filter, { $set: update });
  }

  async remove(id) {
    await mongodbModel.task.deleteOne({ _id: utils.newObjectId(id) });
  }
  
}

module.exports = new TaskService();
