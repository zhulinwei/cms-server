# cms-server

## 简介
cms-server是基于koa实现的内容管理系统后台接口
> * 前台页面：https://github.com/zhulinwei/cms-client
> * 演示地址：http://www.51linwei.top

## 组成
> * 1.用户系统
> * 2.统计系统
> * 3.任务系统
> * 4.通知系统
> * 5.博客系统

## 功能介绍

### 用户系统
用户分为游客、用户、管理员不同角色，每种角色有不同权限：
1. 游客：浏览
2. 用户：留言
3. 管理员：删除留言、发布文章、发布任务

### 统计系统
完成用户数量、文章分布等统计任务

### 任务系统
发布并分配任务

### 通知系统
错误警报、用户留言等通知

#### 博客系统
文章发布

## 启动
1. npm start
2. pm2 start bin/pm2.json
3. docker build -t cms-server; docker run -d cms-server

## 环境变量
|name|descript|demo|
|----|--------|----|
|NAME|项目名称|cms-server|
|PORT|项目端口|3451|
|NODE_ENV|项目环境|.|
|HOSTNAME|host名称|localhost|
|QINIU_HOST|七牛地址|.|
|QINIU_BUCKET|七牛空间|.|
|QINIU_ACCESS_KEY|七牛编号|.|
|QINIU_SECRET_KEY|七牛秘钥|.|
|QQ_WEB_APPID|QQ应用编号|.|
|QQ_WEB_APPKEY|QQ应用秘钥|.|
|MAIL_HOST|邮件地址|smtp.qq.com|
|MAIL_PORT|邮件端口|465|
|MAIL_USER|邮件账号|.|
|MAIL_PASSWORD|邮件密码|.|
|REDIS_CMS|Redis数据库URL|redis://localhost:6379/0|
|MONGODB_CMS|MongoDB数据库URL|mongodb://localhost:27017|

## 数据库设计

### 任务表task
|属性|类型|描述|
|_id|ObjectId|编号|
|status|int|任务状态|
|name|string|任务名称|
|nominee|string|执行人|
|createTime|date|创建时间|
|updateTime|date|更新时间|


