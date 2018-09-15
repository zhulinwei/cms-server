const utils = require('../../utils');
const mongodbModel = require('../../model').mongodbModel;

class CatalogService {
  async exists(query, options) {
    const count = await mongodbModel.blog.catalog.count(query, options);
    return count && count > 0;
  }

  async list(selector, options) {
    selector = selector || {};
    options = options || { limit: 20 };
    const [ count, catalogList ] = await Promise.all([
      mongodbModel.blog.catalog.count(selector),
      mongodbModel.blog.catalog.find(selector, options),
    ]);
    const list = await Promise.all(catalogList.map(async catalog => {
      const count = await mongodbModel.blog.article.count({ catalogId: utils.newObjectId(catalog._id) });
      return Object.assign({
        articleCount: count
      }, catalog);
    }));
    return { count, list };
  }

  async save(body) {
    const filter = { name: body.name };
    const update = {
      name: body.name,
      weight: parseInt(body.weight), 
      createTime: new Date()
    };
    // 创建目录的时候建议使用findOneAndUpdate替代insertOne 
    await mongodbModel.blog.catalog.findOneAndUpdate(filter, update, { upsert: true });
  }

  async update(id, body) {
    console.log(body)
    const filter = { _id: utils.newObjectId(id) };
    const update = {
      name: body.name,
      weight: parseInt(body.weight), 
      updateTime: new Date()
    };

    await mongodbModel.blog.catalog.updateOne(filter, { $set: update });
  }

  async remove(id) {
    await mongodbModel.blog.catalog.deleteOne({ _id: utils.newObjectId(id) });
  }
}

module.exports = new CatalogService();
