// 老实说，Model层按照redis、mysql和mongodb来分层，不是一个好的选择
// 目前这样做主要的原因是因为暂时没有想好存储在mysql中得RBAC会怎么定义
module.exports = {
  redisModel: require('./redis'),
  mysqlModel: require('./mysql'),
  mongodbModel: require('./mongodb')
};
